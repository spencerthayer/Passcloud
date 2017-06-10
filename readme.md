# Passcloud 2.0

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/spencerthayer/Passcloud)

# What is Passcloud?

Passwords are a real problem for today's users; using the same password everywhere can be a disaster and password-managers save your data on the Internet where you're vulnerable to hacking.

Passcloud attempts to solve this by generating pseudo-random passwords based on an *SHA256* algorithm. By combining the same information based on one *Passcloud* you'll always get the same unique password for each site you use, one you'll never forget.

By using Passcloud for every site you visit you're less vulnerable to security breaches, even if one password is compromised all of your other passwords generated from the same Passcloud remains secure!

## Nothing to Hack

With Passcloud there is nothing to intercept since it uses client-side JavaScript and avoids sending sensitive data across a network, making it one of the most secure password managers available. The most secure way of using Passcloud is by using all four fields to create site password. If you don't want to use the same Passcloud and can't think of anything we offer version of the famous XKCD passprase generator just follow the instructions under Passcloud.

Passcloud is based on a stateless algorithm which frees it from the reliance on storage of secrets.

Since your generated passwords aren't saved to your device, there is no risk you'll be forced to divulge them to aggressive peers. And since these passwords don't need to be backed up or synchronized between devices over the network, there is no risk of them getting intercepted.

Finally, Passcloud is free software (GPLv3), its algorithm extensively documented and does not require you to trust any external party. This is particularly interesting in a society where things like PRISM and gag orders are a real threat.

## Always In Sync

Contrary to other password solutions, Passcloud doesn't need to send your passwords over the network to make them ubiquitously available. Just add your user and site names to each of your devices and your passwords will be available instantly on all of them.

No cloud provider to trust, no backups to maintain and no data connection for keeping in sync. Since Passcloud generates your passwords on-demand based on your user name and Passcloud, you don't have any of these fragile dependencies. This gives you massive availability advantages, but also helps thwart man-in-the-middle attacks, snooping and trust issues related to cloud providers.

## For Any Purpose

Passcloud comes with a variety of built-in password types. These types make your site's password look different, become more secure or more compatible with a site's password policy.

The default password is a great balance between security, compatibility and convenience. It is designed to provide great entropy (security) whilst still being easy to manually enter or remember if needed.

You can generate a more secure password, or switch it to a PIN type to use for your bank card or cell phone's SIM lock.

Passcloud also implements a hybrid solution allowing you to save custom passwords in the app. These passwords are AES encrypted using a large key derived from your master password. This grants people who are forced to use a certain password (eg. by their systems administrators) a maximally secure solution given their situational constraints.

# ToDo

