#!/bin/bash
# Files are ordered in proper order with needed wait for the dependent custom resource definitions to get initialized.
# Usage: bash kubectl-apply.sh

kubectl delete -f registry/
kubectl delete -f invoice/
kubectl delete -f notification/
kubectl delete -f store/
#kubectl delete -f console/
