import boto3
from config import AWS_ACCESS_KEY, AWS_SECRET_KEY, REGION

# Set up DynamoDB client
dynamodb = boto3.client(
    'dynamodb',
    region_name=REGION,
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY
)

def create_users_table():
    try:
        response = dynamodb.create_table(
            TableName='Users',
            KeySchema=[
                {'AttributeName': 'PK', 'KeyType': 'HASH'},  # Partition key
                {'AttributeName': 'SK', 'KeyType': 'RANGE'}  # Sort key
            ],
            AttributeDefinitions=[
                {'AttributeName': 'PK', 'AttributeType': 'S'},  # String
                {'AttributeName': 'SK', 'AttributeType': 'S'}   # String
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5
            }
        )
        print("Users table created successfully.")
    except dynamodb.exceptions.ResourceInUseException:
        print("Users table already exists.")


def create_friends_table():
    try:
        response = dynamodb.create_table(
            TableName='Friends',
            KeySchema=[
                {'AttributeName': 'PK', 'KeyType': 'HASH'},  # Partition key
                {'AttributeName': 'SK', 'KeyType': 'RANGE'}  # Sort key
            ],
            AttributeDefinitions=[
                {'AttributeName': 'PK', 'AttributeType': 'S'},  # String
                {'AttributeName': 'SK', 'AttributeType': 'S'}   # String
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5
            }
        )
        print("Friends table created successfully.")
    except dynamodb.exceptions.ResourceInUseException:
        print("Friends table already exists.")


def create_posts_table():
    try:
        response = dynamodb.create_table(
            TableName='Posts',
            KeySchema=[
                {'AttributeName': 'PK', 'KeyType': 'HASH'},  # Partition key
                {'AttributeName': 'SK', 'KeyType': 'RANGE'}  # Sort key
            ],
            AttributeDefinitions=[
                {'AttributeName': 'PK', 'AttributeType': 'S'},  # String
                {'AttributeName': 'SK', 'AttributeType': 'S'},  # String
                {'AttributeName': 'GSI_PK', 'AttributeType': 'S'},  # GSI partition key (User#UserID)
                {'AttributeName': 'GSI_SK', 'AttributeType': 'S'},   # GSI sort key (Timestamp)
            ],
            GlobalSecondaryIndexes=[
                {
                    'IndexName': 'PostsByUser',
                    'KeySchema': [
                        {'AttributeName': 'GSI_PK', 'KeyType': 'HASH'},  # GSI partition key
                        {'AttributeName': 'GSI_SK', 'KeyType': 'RANGE'}  # GSI sort key
                    ],
                    'Projection': {
                        'ProjectionType': 'ALL'
                    },
                    'ProvisionedThroughput': {
                        'ReadCapacityUnits': 5,
                        'WriteCapacityUnits': 5
                    }
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5
            }
        )
        print("Posts table created successfully.")
    except dynamodb.exceptions.ResourceInUseException:
        print("Posts table already exists.")


def create_likes_table():
    try:
        response = dynamodb.create_table(
            TableName='Likes',
            KeySchema=[
                {'AttributeName': 'PK', 'KeyType': 'HASH'},  # Partition key
                {'AttributeName': 'SK', 'KeyType': 'RANGE'}  # Sort key
            ],
            AttributeDefinitions=[
                {'AttributeName': 'PK', 'AttributeType': 'S'},  # String
                {'AttributeName': 'SK', 'AttributeType': 'S'}   # String
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5
            }
        )
        print("Likes table created successfully.")
    except dynamodb.exceptions.ResourceInUseException:
        print("Likes table already exists.")


def create_comments_table():
    try:
        response = dynamodb.create_table(
            TableName='Comments',
            KeySchema=[
                {'AttributeName': 'PK', 'KeyType': 'HASH'},  # Partition key
                {'AttributeName': 'SK', 'KeyType': 'RANGE'}  # Sort key
            ],
            AttributeDefinitions=[
                {'AttributeName': 'PK', 'AttributeType': 'S'},  # String
                {'AttributeName': 'SK', 'AttributeType': 'S'}   # String
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5
            }
        )
        print("Comments table created successfully.")
    except dynamodb.exceptions.ResourceInUseException:
        print("Comments table already exists.")


if __name__ == '__main__':
    create_users_table()
    create_friends_table()
    create_posts_table()
    create_likes_table()
    create_comments_table()
