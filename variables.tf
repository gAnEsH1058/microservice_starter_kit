#
# Variables Configuration
#

variable "cluster-name" {
  default = "terraform-eks-demo"
  type    = string
}

variable "accessKey" {
  type        = string
  description = "Access key to access your AWS account"
}

variable "secretAccessKey" {
  type        = string
  description = "Secret Access key to access your AWS account"
}

variable "region" {
  type = string
  description = "Resources will be spawned in this region"
}

variable "environment" {
  type = string
  description = "Environment in which the infrastructure will be setup"
}

variable "owner" {
  type = string
  description = "Owner of the EKS cluster"
}

variable "purpose" {
  type = string
  description = "Purpose for setting up the cluster (Example: Development)"
}

variable "instance-type" {
  type = string
  description = "Type of instance to be used to create worker nodes"
}

variable "desired-count" {
  type = number
  description = "Desired number of worker nodes to be created"
}
