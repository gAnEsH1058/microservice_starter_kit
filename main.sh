# For creating infrastructure using terraform
terraform init
terraform apply -auto-approve

# Connecting with cluster
terraform output config_map_aws_auth > configmap.yml
kubectl apply -f configmap.yml

# Link to downlload istioctl : https://github.com/istio/istio/tags

# Taking input for installing istio
read -p "Do you want to install istio ? (Enter y for yes):" response

# For converting the response to lower case(If you want to convert to upper case replace ",," with "^^")
response=${response,,}

if [ "$response" = "y" ]; then

	# Installing istio
	istioctl install --set profile=demo

	# Labeling namespace 
	kubectl label namespace default istio-injection=enabled
fi

# Deploying application on eks cluster
kubectl apply -f deployment/python/python-deployment.yaml
kubectl apply -f deployment/python/python-service.yaml
kubectl apply -f deployment/spring/spring-deployment.yaml
kubectl apply -f deployment/spring/spring-service.yaml
kubectl apply -f deployment/angular/angular-deployment.yaml
kubectl apply -f deployment/angular/angular-service.yaml

# For implementing circuit breaker feature of istio for the application
# Creating DestinationRules file for implementing circuit breaker feature
if [ "$response" = "y" ]; then

read -p "Enter the name of the service for whcih you want to implement circuit breaker : " input
cat > destinationRules.yaml <<-EOF
	apiVersion: networking.istio.io/v1alpha3
	kind: DestinationRule
	metadata:
	  name: $input
	spec:
	  host: $input
	  trafficPolicy:
	    connectionPool:
	      tcp:
	        maxConnections: 1
	      http:
	        http1MaxPendingRequests: 1
	        maxRequestsPerConnection: 1
	    outlierDetection:
	      consecutiveErrors: 1
	      interval: 1s
	      baseEjectionTime: 3m
	      maxEjectionPercent: 100
	EOF

kubectl create -f destinationRules.yaml

fi

# Installing kubernetes dashboard
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/download/v0.3.6/components.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-beta8/aio/deploy/recommended.yaml
kubectl apply -f eks-admin-service-account.yaml

# Commands to access dashboard
# kubectl proxy
# Get the secret from the response
# Link:http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/#!/login

# RBAC for ingress
kubectl apply -f rbac-role.yaml

#Ingresscontroller
#apply ingress controller after few minutes of successful creation of the cluster. If you dont wait for few minutes there are chances you might encounter error while #creating ingress resources

sleep 2m

# Deplying ingress controller
terraform output ingress_controller > alb-ingress-controller.yaml
kubectl apply -f alb-ingress-controller.yaml

sleep 2m

# Deploying ingress controller rules
#kubectl apply -f ingress-rules.yaml

# For applying updates rules to ingress
kubectl apply -f new-ingress-rules.yaml

sleep 1m

kubectl get ingress


