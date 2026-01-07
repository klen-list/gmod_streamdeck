local PORT = 35428

local function log(...)
	return MsgN('[StreamDock] ', ...)
end

if util.IsBinaryModuleInstalled('httpserver') then
	require('httpserver')
	log('HTTP module loaded')
else
	log('HTTP module load failed!')
	Derma_Message(
		'HTTP binary module not found or has invalid bitness, check your garrysmod/lua/bin folder!',
		'StreamDock Plugin Error',
		'Oh, ok'
	)

	return
end

local srv = httpserver.Create()

local function newEndpoint(actionId, callback)
	srv:Post('/' .. actionId, function(req, res)
		local succ, err = pcall(callback, req, res)
		if not succ then
			log('ERROR while running action "', actionId, '": ', err)
		end
	end)
end

local function close(response)
	response:SetContent('[]', 'application/json')
end

local function cmdSplit(str)
    local result = {}
    local i = 1

    while i <= #str do
        i = i + (str:match("^%s+", i) or ""):len()

        local quotedMatch = str:match("^\"(.-)\"", i)
        if quotedMatch then
            table.insert(result, quotedMatch)
            i = i + #quotedMatch + 2
        else
            local wordMatch = str:match("^%S+", i)
            if wordMatch then
                table.insert(result, wordMatch)
                i = i + #wordMatch
            else
                break
            end
        end
    end

    return result
end

newEndpoint('concmd', function(request, response)
	local payload = request:GetBody()
	if not payload then return close(response) end

	payload = util.JSONToTable(payload)
	if not payload then return close(response) end

	local cmd = payload.cmd
	if not cmd then return close(response) end

	log('Running cmd: ', cmd)
	RunConsoleCommand(unpack(cmdSplit(cmd)))

	close(response)
end)

srv:Start('127.0.0.1', PORT)
log('Server started on port ', PORT)