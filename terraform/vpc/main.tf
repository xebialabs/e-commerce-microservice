# Create VPC
resource "google_compute_network" "vpc" {
  name                    = "${var.name}-vpc"
  auto_create_subnetworks = "false"
}

# Create Subnet

resource "google_compute_subnetwork" "subnet" {
  depends_on    = ["google_compute_network.vpc"]
  name          = "${var.name}-subnet"
  ip_cidr_range = "${var.subnet_cidr}"
  network       = "${var.name}-vpc"
  region        = "${var.region}"
}

# VPC firewall configuration
# Create a firewall rule that allows internal communication across all protocols:
resource "google_compute_firewall" "firewalli-int" {
  depends_on    = ["google_compute_subnetwork.subnet"]
  name    = "${var.name}-firewall-int"
  network = "${var.name}-vpc"

  allow {
    protocol = "icmp"
  }

  allow {
    protocol = "tcp"
  }

  allow {
    protocol = "udp"
  }

  source_ranges = ["${google_compute_subnetwork.subnet.ip_cidr_range}"]
}

# Create a firewall rule that allows external SSH, ICMP, and HTTPS:
resource "google_compute_firewall" "firewalli-ext" {
  depends_on    = ["google_compute_subnetwork.subnet"]
  name    = "${var.name}-firewall-ext"
  network = "${var.name}-vpc"

  allow {
    protocol = "icmp"
  }

  allow {
    protocol = "tcp"
    ports    = ["22", "6443"]
  }

  source_ranges = ["0.0.0.0/0"]
}
