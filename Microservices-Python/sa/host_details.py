from flask import Flask ,jsonify ,request
import socket


app = Flask(__name__)
@app.route("/")
def get_hostaname_ip():
    
     try: 
        host_name = socket.gethostname() 
        host_ip = socket.gethostbyname(host_name) 
        print("Hostname :  ",host_name) 
        print("IP : ",host_ip) 
     except: 
        print("Unable to get Hostname and IP") 
  
        
     return jsonify(
        applicationName="Python",
        serviceType="ClusterIP",
        hostName=host_name,
        hostIp=host_ip
    )


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
