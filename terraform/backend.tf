# Configure the Google Cloud tfstate file location
terraform {
  backend "gcs" {
    bucket = "deepu-playground"
    prefix = "terraform"
    credentials = "account.json"
  }
}