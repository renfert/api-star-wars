import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import getPlanet from '@functions/getPlanet';
import savePlanet from '@functions/savePlanet';

const serverlessConfiguration: AWS = {
  service: 'planets-star-warss-api',
  frameworkVersion: '3',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: [
    'serverless-webpack',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    profile: 'rtejada-personal',
    stage: '${opt:stage}',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
    iam: {
      role:{
        statements: [
          {
            Effect: 'Allow',
            Action: [
              'dynamodb:PutItem',
              'dynamodb:GetItem'
            ],
            Resource: {
              'Fn::Join': [
                '',
                [
                  'arn:aws:dynamodb:',
                  { Ref: 'AWS::Region' },
                  ':',
                  { Ref: "AWS::AccountId" },
                  ':table/planets-star-wars'
                ]
              ]
            }
          }
        ]
      }
    },
  },
  // import the function via paths
  functions: { 
    hello,
    getPlanet,
    savePlanet
  },
};

module.exports = serverlessConfiguration;
