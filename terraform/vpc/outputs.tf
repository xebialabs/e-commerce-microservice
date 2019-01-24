# network VPC output

output "vpc_name" {
  value       = "${google_compute_network.vpc.name}"
  description = "The unique name of the network"
}

output "self_link" {
  value       = "${google_compute_network.vpc.self_link}"
  description = "The URL of the created resource"
}

# network subnet output

output "ip_cidr_range" {
  value       = "${google_compute_subnetwork.subnet.ip_cidr_range}"
  description = "Export created CICDR range"
}

output "subnet_name" {
  value       = "${google_compute_subnetwork.subnet.name}"
  description = "Export created CICDR name"
}