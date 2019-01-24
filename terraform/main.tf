# Configure the Google Cloud provider

provider "google" {
  credentials = "${file("account.json")}"
  version = "~> 1.16"
  project = "${var.project_id}"
  region  = "${var.region}"
}

module "vpc" {
  source        = "./vpc"
  name          = "${var.name}"
  region        = "${var.region}"
  subnet_cidr   = "${var.subnet_cidr}"
}

module "gke" {
  source                = "./gke"
  name                  = "${var.name}"
  region                = "${var.region}"
  min_master_version    = "${var.min_master_version}"
  node_version          = "${var.node_version}"
  gke_num_nodes         = "${var.gke_num_nodes}"
  vpc_name              = "${module.vpc.vpc_name}"
  subnet_name           = "${module.vpc.subnet_name}"
  gke_master_user       = "${var.gke_master_user}"
  gke_master_pass       = "${var.gke_master_pass}"
  gke_node_machine_type = "${var.gke_node_machine_type}"
  gke_label             = "${var.gke_label}"
}
