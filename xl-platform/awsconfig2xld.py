#!/usr/bin/env python3
import getpass
import sys
import configparser
import os
import yaml

#
# Util
#
def print_as_yaml(dict):
    print(yaml.safe_dump(dict, default_flow_style=False))

# Hack to properly print Yaml
# https://stackoverflow.com/questions/45004464/yaml-dump-adding-unwanted-newlines-in-multiline-strings
yaml.SafeDumper.org_represent_str = yaml.SafeDumper.represent_str
def repr_str(dumper, data):
    if '\n' in data:
        return dumper.represent_scalar(u'tag:yaml.org,2002:str', data, style='|')
    return dumper.org_represent_str(data)
yaml.add_representer(str, repr_str, Dumper=yaml.SafeDumper)

#
# Create XLD YAML from AWS credentials and config
#

def aws_credentials_to_infrastructure(credentialsfile):
    # Read AWS credentials file
    credentials = configparser.ConfigParser()
    credentials.read(credentialsfile)

    # Build CIs for XL Deploy
    return {
        'apiVersion': 'xl-deploy/v1beta1',
        'kind': 'Infrastructure',
        'spec': [
            {
                'name': 'AWS',
                'type': 'aws.Cloud',
                'accesskey': credentials['default']['aws_access_key_id'],
                'accessSecret': credentials['default']['aws_secret_access_key']
            }
        ]
    }

def aws_config_to_environment(configfile, infrastructure):
    # Read AWS config file
    config = configparser.ConfigParser()
    config.read(configfile)

    # Build CIs for XL Deploy
    return {
        'apiVersion': 'xl-deploy/v1beta1',
        'kind': 'Environments',
        'spec': [
            {
                'name': 'AWS-DICT',
                'type': 'udm.Dictionary',
                'entries': {
                    'region': config['default']['region'],
                    'username': getpass.getuser()
                }
            },
            {
                'name': 'AWS',
                'type': 'udm.Environment',
                'members': [
                    '~Infrastructure/' + infrastructure['spec'][0]['name']
                ],
                'dictionaries': [
                    '~Environments/AWS-DICT'
                ]
            }
        ]
    }

    return environment


# Converts AWS credentials and config files to XL Deploy objects
credentialsfile = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.expanduser('~'), '.aws/credentials')
infrastructure = aws_credentials_to_infrastructure(credentialsfile)

configfile = sys.argv[2] if len(sys.argv) > 2 else os.path.join(os.path.expanduser('~'), '.aws/config')
environment = aws_config_to_environment(configfile, infrastructure)

# Print YAML
print_as_yaml(infrastructure)
print("---")
print_as_yaml(environment)
