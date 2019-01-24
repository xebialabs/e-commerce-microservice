# GCP variables


variable "project_id" {
  description = "Project ID"
}

variable "region" {
  description = "Region of resources"
}

# variable "bucket_name" {
#   description = "Name of the google storage bucket"
# }

variable "name" {
  default = "ecommerce-microservice"
  description = "Name for project"
}

# Network variables

variable "subnet_cidr" {
  default = "10.10.0.0/24"
  description = "Subnet range"
}

# GKE variables

variable "min_master_version" {
  default     = "1.11.5-gke.5"
  description = "Minimum GKE master version"
}

variable "node_version" {
  default     = "1.11.5-gke.5"
  description = "Minimum GKE node version"
}

variable "gke_num_nodes" {
  default = 2
  description = "Number of nodes in each GKE cluster zone"
}

variable "gke_master_user" {
  default     = "k8s_admin"
  description = "Username to authenticate with the k8s master"
}

variable "gke_master_pass" {
  description = "Password to authenticate with the k8s master"
}

variable "gke_node_machine_type" {
  default     = "n1-standard-1"
  description = "Machine type of GKE nodes"
}

variable gke_label {
  default = "ecommerce"
  description = "label"
}
