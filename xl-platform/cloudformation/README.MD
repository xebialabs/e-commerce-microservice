## Provision EKS with CloudFormation

aws cloudformation create-stack --stack-name eks-user --template-body file://eks-user.yaml --capabilities "CAPABILITY_NAMED_IAM"
aws cloudformation create-stack --stack-name eks-vpc --template-body file://eks-vpc.yaml
aws cloudformation create-stack --stack-name eks-master --template-body file://eks-master.yaml --capabilities "CAPABILITY_IAM"
aws cloudformation create-stack --stack-name eks-workers --template-body file://eks-workers.yaml --capabilities "CAPABILITY_IAM"
