# e-commerce microservice application on GCP GKE

The blueprint deploys an e-commerce microservice created using JHipster to Google Kubernetes Engine.
XL Deploy does the provisioning and deployment, while XL Release orchestrates everything.

## Prerequisites

### Authenticate to gcloud

Before configuring gcloud CLI you can check available Zones and Regions nearest to your location

```sh
gcloud compute regions list

gcloud compute zones list
```

Follow gcloud init and select default Zone Ex. asia-south1

```sh
gcloud init
```

***********************

### Creating Google Cloud project and service account for terraform

Best practice to use separate account "technical account" to manage infrastructure, this account can be used in automated code deployment like in Jenkins, CirceleCI or any other tool you may choose.

#### Set up environment

```sh
export TF_ADMIN=[GCP project ID]
```

#### Create the GCP Project

Create a new project and link it to your billing account (You could do it from the GCP console GUI as well)

```sh
gcloud projects create ${TF_ADMIN} \
--organization [YOUR_ORG_ID] \
--set-as-default

gcloud beta billing projects link ${TF_ADMIN} \
--billing-account [YOUR_BILLING_ACCOUNT_ID]
```

> NOTE: value of YOUR_ORG_ID and YOUR_BILLING_ACCOUNT_ID you can find by running

```sh
gcloud organizations list

gcloud beta billing accounts list
```

#### Create the Terraform service account

Create the service account in the GCP project and download the JSON credentials:

```sh
gcloud iam service-accounts create terraform \
--display-name "Terraform admin account"

gcloud iam service-accounts keys create account.json \
--iam-account terraform@${TF_ADMIN}.iam.gserviceaccount.com
```

Grant the service account permission to view the Admin Project and manage Cloud Storage

```sh
gcloud projects add-iam-policy-binding ${TF_ADMIN} \
--member serviceAccount:terraform@${TF_ADMIN}.iam.gserviceaccount.com \
 --role roles/viewer
 
gcloud projects add-iam-policy-binding ${TF_ADMIN} \
--member serviceAccount:terraform@${TF_ADMIN}.iam.gserviceaccount.com \
 --role roles/storage.admin
  
gcloud projects add-iam-policy-binding ${TF_ADMIN} \
--member serviceAccount:terraform@${TF_ADMIN}.iam.gserviceaccount.com \
 --role roles/compute.admin
  
gcloud projects add-iam-policy-binding ${TF_ADMIN} \
--member serviceAccount:terraform@${TF_ADMIN}.iam.gserviceaccount.com \
 --role roles/compute.networkAdmin
  
gcloud projects add-iam-policy-binding ${TF_ADMIN} \
--member serviceAccount:terraform@${TF_ADMIN}.iam.gserviceaccount.com \
 --role roles/container.admin
  
gcloud projects add-iam-policy-binding ${TF_ADMIN} \
--member serviceAccount:terraform@${TF_ADMIN}.iam.gserviceaccount.com \
 --role roles/container.clusterAdmin

gcloud projects add-iam-policy-binding ${TF_ADMIN} \
--member serviceAccount:terraform@${TF_ADMIN}.iam.gserviceaccount.com \
 --role roles/iam.serviceAccountUser
```

Enabled API for newly created projects

```sh
gcloud services enable cloudresourcemanager.googleapis.com \
    cloudbilling.googleapis.com \
    iam.googleapis.com \
    compute.googleapis.com \
    container.googleapis.com
```

## Creating back-end storage to tfstate file in Cloud Storage

Terraform stores the state about infrastructure and configuration by default local file "terraform.tfstate. State is used by Terraform to map resources to configuration, track metadata.

Terraform allows state file to be stored remotely, which works better in a team environment or automated deployments.
We will used Google Storage and create new bucket where we can store state files.

Create the remote back-end bucket in Cloud Storage for storage of the terraform.tfstate file

```sh
gsutil mb -p ${TF_ADMIN} -l asia-southeast1 gs://${TF_ADMIN}
```

Enable versioning for said remote bucket:

```sh
gsutil versioning set on gs://${TF_ADMIN}
```

## Using the blueprint

1. If you do not have XL Release and XL Deploy instances running, you can use this Docker Compose setup to spin them up. The setup also contains a preconfigured Jenkins instance.
Please note that you need to obtain a trial license or bring your own license for XL Release and XL Deploy. Follow the steps below to use the Docker Compose files.

    1. Download the contents of https://github.com/xebialabs/e-commerce-microservice/tree/gke-blueprint/docker-compose/xebialabs into a folder such as `xl-platform`.
    2. Copy the license for XL Release into `xl-platform/xl-release/default-conf/` and the license for XL Deploy into `xl-platform/xl-deploy/default-conf/`.
    3. Run `docker-compose up --build` on the `xl-platform` folder.

2. Git clone [https://github.com/xebialabs/e-commerce-microservice/tree/gke-blueprint](https://github.com/xebialabs/e-commerce-microservice/tree/gke-blueprint)
3. Generate the blueprint with `xl blueprint -t gcp/microservice-ecommerce`.


To deploy this blueprint with the XebiaLabs DevOps Platform, follow the steps below:

1. Apply the generated YAML configurations using the XL CLI.

    ```
    xl apply -f xebialabs.yaml
    ```

2. Go to XL Release, look for the "gke-blueprint-demo-ci-cd" template, and start a new release from it.