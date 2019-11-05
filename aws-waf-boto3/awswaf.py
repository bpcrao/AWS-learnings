import boto3
from botocore.config import Config


# Constants
API_RETRIES = 3

waf_client = boto3.client("waf")
response = waf_client.get_web_acl(WebACLId="61e2ba65-807f-4794-a001-eaae4928a48f")


# create web ACL
def create_web_acl(name):
    change_token = waf_client.get_change_token().get("ChangeToken")

    try:
        waf_client.create_web_acl(
            Name=name,
            MetricName=name.replace("  ", ""),
            DefaultAction={"Type": "ALLOW"},
            ChangeToken=change_token,
            Tags=[
                {"Key": "environment", "Value": "development"},
                {"Key": "team", "Value": "cloud_apps_team"},
            ],
        )
        print("created web acl successfully", name)
    except Exception as error:
        print("An error occurred, creating webacl:{0}", error)

#create_web_acl("test xl")

def create_rule_group(name):
    try:
        change_token = waf_client.get_change_token().get("ChangeToken")
        response = waf_client.create_rule_group (
            Name=name,
            MetricName=name.replace(" ", ""),
            ChangeToken=change_token
        )
    except Exception as error:
        print("An error occurred, creating rules group :{0}", error)

#create_rule_group('Whitelist test')

def add_rule_to_group(group, **kwargs):
    try:
        print("adding rules")
    except Exception as error:
        print("An error occurred, creating rules group :{0}", error)
