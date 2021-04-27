package com.sa.web.dto;

import java.net.InetAddress;

public class MachineDetails {
	
	
	private String hostName;
	private String hostIP;
	public String getHostName() {
		return hostName;
	}
	public void setHostName(String hostName) {
		this.hostName = hostName;
	}
	public String getHostIP() {
		return hostIP;
	}
	public void setHostIP(String hostIP) {
		this.hostIP = hostIP;
	}
	 @Override
	    public String toString(){
	        return getHostName() + ", "+ getHostIP();
	    }
	

}
