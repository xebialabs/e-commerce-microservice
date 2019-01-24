# GKE outputs

output "endpoint" {
  value       = "${google_container_cluster.primary.endpoint}"
  description = "Endpoint for accessing the master node"
}
