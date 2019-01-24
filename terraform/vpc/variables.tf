# Subnet variables
variable "name" {
  description = "Name for project"
}

variable "region" {
  description = "Region of resources"
}

variable "subnet_cidr" {
  default = "10.10.0.0/24"
  description = "Subnet range"
}
