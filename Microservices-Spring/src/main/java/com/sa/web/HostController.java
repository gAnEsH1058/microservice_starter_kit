package com.sa.web;

import java.net.InetAddress;
import java.net.UnknownHostException;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser; 
import com.google.gson.JsonParseException;

import com.sa.web.dto.MachineDetails;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "*")
@RestController
@Controller
public class HostController {

	@Value("${sa.logic.api.url}")
	private String saLogicApiUrl;
	

	@GetMapping("/hostDetailsPython")
	public String getPythonHostDetails() {
		RestTemplate restTemplate = new RestTemplate();
		final String response = restTemplate.getForObject("http://10.0.0.7/", String.class);
		return response;
	}

	@GetMapping("/hostDetailsPython1")
	public String getPythonHostDetails2() {
		RestTemplate restTemplate = new RestTemplate();
		final String response = restTemplate.getForObject(saLogicApiUrl, String.class);
		return response;
	}

	@GetMapping("/hostDetailsPythonWithPort")
	public String getPythonHostDetails1() {
		RestTemplate restTemplate = new RestTemplate();
		final String response = restTemplate.getForObject("http://10.0.0.7:5000/", String.class);
		return response;
	}

	@RequestMapping(value = "/hostdetailsSpringApp", method = RequestMethod.GET, produces = "application/json")
	public @ResponseBody String getHostDetails() throws JsonParseException {
		InetAddress hostdetails;
		String hostname;
		String hostip;
		JsonArray jarray = new JsonArray();
		JsonObject pythonobj = new JsonObject();
		JsonObject springobj = new JsonObject();

		try {
			RestTemplate restTemplate = new RestTemplate();
			final String response = restTemplate.getForObject(saLogicApiUrl + "/", String.class);
			@SuppressWarnings("deprecation")
			JsonParser parser = new JsonParser();

			JsonObject jsonobj = (JsonObject) parser.parse(response);
			if (response != null) {
				pythonobj.add("applicationName", jsonobj.get("applicationName"));
				pythonobj.add("hostIP", jsonobj.get("hostIp"));
				pythonobj.add("hostName", jsonobj.get("hostName"));
				pythonobj.add("serviceType", jsonobj.get("serviceType"));

			}

			MachineDetails md = new MachineDetails();

			hostdetails = InetAddress.getLocalHost();
			hostname = hostdetails.getHostName();
			hostip = hostdetails.getHostAddress();

			md.setHostIP(hostip);
			md.setHostName(hostname);
			System.out.println("Your current IP address : " + hostip);
			System.out.println("Your current Hostname : " + hostname);

			springobj.addProperty("applicationName", "Spring");
			springobj.addProperty("serviceType", "clusterIP");
			springobj.addProperty("hostName", hostname);
			springobj.addProperty("hostIP", hostip);
			jarray.add(pythonobj);
			jarray.add(springobj);

			return jarray.toString();

		} catch (UnknownHostException e) {

			e.printStackTrace();
			return null;
		}

	}


	@GetMapping("/testHealth")
	public String testHealth() {

		return "test health call";
	}

	@GetMapping("/testHealth1")
	public String testHealth1() {
		// getPythonHostDetails();
		return saLogicApiUrl;

	}

}
