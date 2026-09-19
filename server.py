import http.server
import socketserver
import json
import base64
import os

class ImageHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data)
        
        for name, b64 in data.items():
            b64_data = b64.split(',')[1]
            filepath = os.path.join('assets', name + '.png')
            with open(filepath, 'wb') as f:
                f.write(base64.b64decode(b64_data))
                
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"OK")
        
        # Stop server after receiving
        print("Images saved. Shutting down.")
        os._exit(0)

PORT = 8000
with socketserver.TCPServer(("", PORT), ImageHandler) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()
