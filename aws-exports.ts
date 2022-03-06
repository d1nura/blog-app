const awsconfig = JSON.parse(`{
    "UserAgent": "aws-amplify-cli/0.1.0",
    "Version": "0.1.0",
    "IdentityManager": {
        "Default": {}
    },
    "CredentialsProvider": {
        "CognitoIdentity": {
            "Default": {
                "PoolId": "ap-south-1:e73fb7e1-140f-4d26-8471-4332e6dcaf84",
                "Region": "ap-south-1"
            }
        }
    },
    "CognitoUserPool": {
        "Default": {
            "PoolId": "ap-south-1_Q4JHsU7q0",
            "AppClientId": "6cvmaknhhtppep7tn0nj7fa2jf",
            "Region": "ap-south-1"
        }
    },
    "Auth": {
        "Default": {
            "authenticationFlowType": "USER_SRP_AUTH",
            "socialProviders": [],
            "usernameAttributes": [
                "EMAIL"
            ],
            "signupAttributes": [
                "EMAIL"
            ],
            "passwordProtectionSettings": {
                "passwordPolicyMinLength": 8,
                "passwordPolicyCharacters": []
            },
            "mfaConfiguration": "OFF",
            "mfaTypes": [
                "SMS"
            ],
            "verificationMechanisms": [
                "EMAIL"
            ]
        }
    }
}`);

export default awsconfig;
