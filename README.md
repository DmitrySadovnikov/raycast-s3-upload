# Raycase S3 Upload

Why pay for third-party services to store your files when you can upload an image or file to your S3 bucket, get a URL for the file, and use it on the internet?
Usually, third-party services charge $5-10 to store your files, but AWS S3 allows you to store terabytes almost for free ($0.023 per GB). [Check AWS S3 Pricing](https://aws.amazon.com/s3/pricing/).

## Instructions

### 1. Create an S3 bucket
https://us-east-1.console.aws.amazon.com/s3/bucket/create and keep the default configuration but allow public access.

   <img width="698" alt="Screenshot 2024-07-04 at 1 35 28 PM" src="https://github.com/DmitrySadovnikov/raycast-s3-upload/assets/18239515/19be039f-7cdc-456c-b1c4-dff04940cbda">

### 2. Create a policy
https://us-east-1.console.aws.amazon.com/iam/home?region=us-east-1#/policies/create with access to put objects and set public access to the object:

   ```json
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Effect": "Allow",
               "Action": [
                   "s3:PutObject",
                   "s3:PutObjectAcl"
               ],
               "Resource": [
                   "arn:aws:s3:::7f25c230-b972-42c9-8867-72e4cf5eb8ca/*"
               ]
           }
       ]
   }
   ```

   Replace `7f25c230-b972-42c9-8867-72e4cf5eb8ca` with the name of your bucket.

### 3. Create an IAM user
https://us-east-1.console.aws.amazon.com/iam/home?region=us-east-1#/users/create and attach the created policy to this user.

   <img width="1568" alt="Screenshot 2024-07-04 at 1 41 26 PM" src="https://github.com/DmitrySadovnikov/raycast-s3-upload/assets/18239515/f9e26588-df3b-4911-a59b-d5e394c47b6e">

### 4. Add an access key
Go to the "Security Credentials" section of the user and add an access key:

   <img width="1312" alt="Screenshot 2024-07-04 at 1 53 09 PM" src="https://github.com/DmitrySadovnikov/raycast-s3-upload/assets/18239515/6f0c4555-85e0-478a-a5be-f83978426d53">
   <img width="1105" alt="Screenshot 2024-07-04 at 1 51 35 PM" src="https://github.com/DmitrySadovnikov/raycast-s3-upload/assets/18239515/1890e42a-b68f-4dc5-9bd0-af6d484d04fd">

## Raycast Configuration

Clone the repo and import the extension:
<img width="755" alt="Screenshot 2024-07-05 at 10 23 08 AM" src="https://github.com/DmitrySadovnikov/raycast-s3-upload/assets/18239515/06c3abf4-c21c-4263-99b0-68f316c3e3c8">

Add your credentials to the plugin:

<img width="312" alt="Screenshot 2024-07-05 at 9 59 36 AM" src="https://github.com/DmitrySadovnikov/raycast-s3-upload/assets/18239515/4837f0f0-23f0-441f-b0d0-346af007faef">

You can assign a hotkey for faster access.

<img width="653" alt="Screenshot 2024-07-05 at 10 17 33 AM" src="https://github.com/DmitrySadovnikov/raycast-s3-upload/assets/18239515/a70447b5-3330-4ece-b228-d38ef6b4026e">

## Usage

Attach the desired file and submit the form:
<img width="741" alt="Screenshot 2024-07-05 at 10 19 22 AM" src="https://github.com/DmitrySadovnikov/raycast-s3-upload/assets/18239515/151888c7-62c4-43cb-b018-860012e7f4d1">


Congratulations, file is uploaded! 🎉 Just copy the link and use wherever you want.
<img width="745" alt="Screenshot 2024-07-05 at 10 19 40 AM" src="https://github.com/DmitrySadovnikov/raycast-s3-upload/assets/18239515/c1f335a1-37f7-4390-a705-e98f8f01af3a">

