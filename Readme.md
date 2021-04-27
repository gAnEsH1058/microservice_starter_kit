##Overview:##
This script will help you to setup EKS cluster with worker nodes on AWS.
It will perform the following tasks:

* Setup EKS cluster with worker nodes
* Deploy an application on it
* Install kubernetes dashboard
* Install Istio(Optinal)
* Implement circuit breaker feature of Istio
* Setup ingress to access the web application

##Execution:##
###1. Pre-requisites###
You should have the following softwares installed on the system on which you wil run the shell script

1. [AWS cli](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
2. [AWS iam authenticator](https://docs.aws.amazon.com/eks/latest/userguide/install-aws-iam-authenticator.html)
3. [Docker](https://docs.docker.com/get-docker/)
4. [Terraform](https://learn.hashicorp.com/terraform/getting-started/install.html#install-terraform)
5. [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) 
6. [istioctl](https://github.com/istio/istio/tags)
7. Git Bash (for Windows OS)

***(Note:The main.sh is a bash script. It will not run in the command prompt or powershell in windows. You need a Git Bash or something that can interpret bash script)***

###2. Step for execution###
####For creating Docker imiages for the application####

1. For creating the docker images we need Dockerfile. Dockerfiles are present in the respective folder. To create the docker images using Dockerfile navigate into the folder where the docker file is present and then run the following command
`sudo docker build -t <reponame:tag> .`
Replace the "reponame" with your repository name and "tag" with a suitable tag for the image.

2. To push the image built in the previous step to AWS ECR first tag the image according to AWS ECR naming convention.
`sudo docker tag <reponame:tag> <URI/reponame:tag>`
Replace the "reponame" and "tag" with current reponame and tag. Replace "URI" with uri of AWS ECR, "reponame" with the repository name in AWS ECR and "tag" with suitable tag for the image.

3. To be able to push the image into the AWS ECR first you need to login. For that click on the "View push commands" button on the repository page in AWS and copy the first command. This command will retrieve an authentication token and authenticate your Docker client to your registry.

4. Use the following command to push the image into the AWS ECR
`sudo docker push <URI/reponame:tag>`
Replace the "URI/reponame:tag" with the tag and name given in the previous step.

####For running the bash script:####

1. For authentication with AWS subscription, one must use access key and sceret key provided with account to deploy resources on AWS.You can either configure the credentials using command `aws configure` or you can add the credentials in the *terraform.tfvars* file.
2. Edit *terraform.tfvars*  file to insert values for the variable. Example : variable = "" your value between double quotes.  
3. Command to run bash script 
		
		`./main.sh`

4. While the bash script is executing you will be asked whether to install istio or not. If you want to install istio enter *y* for yes.
5. In the previous step if you have accepted to install istio then istio circuit breaker feature will also be implemented. You will be asked to enter the name of the service for which you want to apply the circuit breaker feature. Enter the name of the service as it is mentioned in the *service.yaml* file

#####Output:#####

If the bash script executes successfully then it will display DNS name of of a load balancer. Copy the the DNS name of the load balancer and paste it into a web browser to access the application. 

####For accessing kubernetes dashboard#### 

Link:<http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/#!/login>

Execute the following command to fetch secret token to login into the kubernetes dashboard

`kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep eks-admin | awk '{print $1}')`

copy the token and paste it into the login page of kubernetes dashboard

#####Output:#####

After logging in to the dashboard you will be able to view the kubernetes dashboard and perform different operation on it.


####For accessing different apps deployed by istio####
Available apps:

* controlz
* envoy      
* grafana     
* jaeger      
* kiali       
* prometheus  
* zipkin

Change the name of app after the "d" flag in the below command

`istioctl d envoy`

#####Output:#####

After the above command is executed you will be redirected to a web browser where you can view and perform different operation on the dashboard of that particular application 

###Cleanup###
In case if you want to delete the cluster then perform the following operation

1. To delete ingress rules

`kubectl delete ingress ingress-rules-new`

2. To delete ingress deployment

`kubectl delete deployment alb-ingress-controller -n kube-system`

3. Deleting istio

`kubectl delete namespace istio-system` 

4. To destroy the infrastructure

 ***(Note: Make sure you are in the directory where ".terraform" folder is present)***

`terraform destroy -auto-approve`
