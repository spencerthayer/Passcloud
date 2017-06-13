# Passcloud 2.0

Alpha testing of 2.0: https://passcld.herokuapp.com/

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/spencerthayer/Passcloud)

## What is Passcloud?

For most people, passwords are a real problem. Remembering passwords is a pain and using the same password everywhere will eventually lead to a disaster. While traditional password managers solve this with lots of random passwords

they have to save your passwords in their databases. This makes your lists of passwords vulnerable to hacking and interception.
Passcloud attempts to solve the problem other password managers have by never storing your passwords. Instead, Passcloud generates pseudo-random passwords based on the Mersenne Twister PRNG algorithm. Users combine the same repeatable information based on a master password and always get the same unique password.

By using Passcloud for every site you visit you're less vulnerable to security breaches, even if one password is compromised all of your other passwords generated from the same Passcloud remains secure!

## Nothing to Hack

With Passcloud there is nothing to intercept since it uses client-side JavaScript and avoids sending sensitive data across a network, making it one of the most secure password managers available. Passcloud is based on a stateless algorithm which frees it from the reliance on storage of secrets.

Since your generated passwords aren't saved to your device, there is no risk you'll be forced to divulge them to aggressive peers. And since these passwords don't need to be backed up or synchronized between devices over the network,there is no risk of them getting intercepted.

Finally, Passcloud is free software (GPLv3), its algorithm extensively documented and does not require you to trust any external party. This is particularly interesting in a society where things like PRISM and gag orders are a real threat.

## Always In Sync
No cloud provider to trust, no backups to maintain and no data connection for keeping in sync. Contrary to other password solutions, Passcloud doesn't need to send your passwords over the network to make them ubiquitously available.

Just add your information into each of your devices and your passwords will be available instantly on all of them.

No cloud provider to trust, no backups to maintain and no data connection for keeping in sync. Since Passcloud generates your passwords on-demand based on your user name and Passcloud, you don't have any of these fragile dependencies.

This gives you massive availability advantages, but also helps thwart man-in-the-middle attacks, snooping and trust issues related to cloud providers.

Since Passcloud generates your passwords on-demand based on your information and master password, you don't have any of these fragile dependencies. This gives you massive availability advantages but also helps thwart man-in-the-middle attacks, snooping and trust issues related to cloud providers.

## For Any Purpose

Passcloud comes with a variety of built-in password types. These types make your password look different, become more secure or more compatible with a site's password policy.
Passcloud also implements a solution that allows you to save custom information in the app. This information is AES encrypted using a large key derived from your master password.
