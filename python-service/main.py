import contextlib
import io
import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse


class PythonExecutionHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/":
            self._send_json({"status": "healthy", "service": "AlgoViz Python Execution Engine"})
            return

        self.send_error(404, "Not Found")

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path != "/api/execute":
            self.send_error(404, "Not Found")
            return

        try:
            content_length = int(self.headers.get("Content-Length", "0"))
            raw_body = self.rfile.read(content_length)
            payload = json.loads(raw_body.decode("utf-8"))
            code = payload.get("code", "")
        except Exception:
            self._send_json({"success": False, "error": "Invalid JSON payload", "output": ""}, status=400)
            return

        stdout_buffer = io.StringIO()
        try:
            with contextlib.redirect_stdout(stdout_buffer):
                exec_namespace = {}
                exec(code, exec_namespace)

            self._send_json({"success": True, "output": stdout_buffer.getvalue()})
        except Exception as exc:  # pragma: no cover - error path
            self._send_json({"success": False, "error": str(exc), "output": stdout_buffer.getvalue()})

    def _send_json(self, payload, status=200):
        encoded = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(encoded)))
        self.send_header("Access-Control-Allow-Origin", "http://localhost:3000")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()
        self.wfile.write(encoded)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "http://localhost:3000")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()


if __name__ == "__main__":
    server = ThreadingHTTPServer(("0.0.0.0", 8000), PythonExecutionHandler)
    print("AlgoViz Python execution engine listening on http://localhost:8000")
    server.serve_forever()
