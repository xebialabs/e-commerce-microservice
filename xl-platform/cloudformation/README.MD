## Provision EKS with CloudFormation

aws cloudformation create-stack --stack-name eks-user-stack --template-body file://eks-user-stack.yaml --capabilities "CAPABILITY_NAMED_IAM"
aws cloudformation create-stack --stack-name vpc-stack --template-body file://vpc-stack.yaml
aws cloudformation create-stack --stack-name eks-master-stack --template-body file://eks-master-stack.yaml --capabilities "CAPABILITY_IAM"
aws cloudformation create-stack --stack-name eks-workers-stack --template-body file://eks-workers-stack.yaml --capabilities "CAPABILITY_IAM"
