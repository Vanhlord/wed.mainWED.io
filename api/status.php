<?php
// status.php (BẢN CAO CẤP)
// --------------------------
// Lấy thông tin chi tiết Minecraft Server qua query & ping trực tiếp

$serverIP = "play.daicasmp.vn";
$serverPort = 25565;

function pingServer($host, $port = 25565, $timeout = 3)
{
    $startTime = microtime(true);
    $socket = @stream_socket_client("tcp://$host:$port", $errno, $errstr, $timeout);

    if (!$socket) {
        return [
            "online" => false,
            "error" => "$errstr ($errno)"
        ];
    }

    stream_set_timeout($socket, $timeout);
    fwrite($socket, "\xFE\x01");
    $data = fread($socket, 2048);
    fclose($socket);
    $pingTime = round((microtime(true) - $startTime) * 1000);

    if ($data === false || strlen($data) < 4 || $data[0] != "\xFF") {
        return ["online" => false];
    }

    $data = substr($data, 3);
    $data = iconv("UTF-16BE", "UTF-8", $data);
    $info = explode("\x00", $data);

    return [
        "online" => true,
        "motd" => $info[3] ?? "Minecraft Server",
        "players" => [
            "online" => (int) ($info[4] ?? 0),
            "max" => (int) ($info[5] ?? 0)
        ],
        "version" => $info[2] ?? "Unknown",
        "ping" => $pingTime
    ];
}

// Lấy icon server (nếu có favicon)
function getServerIcon($host, $port = 25565)
{
    $response = @file_get_contents("https://api.mcsrvstat.us/3/$host:$port");
    if ($response) {
        $data = json_decode($response, true);
        if (isset($data["icon"])) {
            return $data["icon"];
        }
    }
    return null;
}

$status = pingServer($serverIP, $serverPort);
$status["ip"] = $serverIP;
$status["port"] = $serverPort;
$status["timestamp"] = date("Y-m-d H:i:s");
$status["icon"] = getServerIcon($serverIP, $serverPort);

header("Content-Type: application/json; charset=utf-8");
echo json_encode($status, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>
<?php
// status.php (BẢN CAO CẤP)