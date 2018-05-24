# What is Passcloud?

For most people, passwords are a real problem. Remembering passwords is a pain and using the same password everywhere will eventually lead to disaster. While traditional password managers attempt to solve this with randomized passwords they sacrifice your security by saving your passwords to a database.

**This makes your passwords vulnerable to interception and hacks!**

Passcloud deals with this problem by _never storing your passwords_. Instead, Passcloud generates repeatable pseudo-random passwords based on the cryptographically secure [Mersenne Twister PRNG algorithm](http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html). Passcloud uses this stateless algorithm to free you from the danger of storing your passwords, as long as you can remember the same repeatable information you will always get the same unique password. It's amazing, really.

By using Passcloud for every site you visit you're less vulnerable to security breaches, even if one password is compromised all of your other passwords generated by Passcloud remain secure!

## Nothing to Hack

With Passcloud there is no risk of hacking since it uses client-side JavaScript and your passwords are never saved. Contrary to other password solutions, Passcloud doesn't need to send your passwords over the network to make them ubiquitously available. Since Passcloud generates your passwords based on your repeatable information, you don't have any fragile dependencies. Just remember your repeatable information on any device and your passwords will be available instantly. By default Passcloud doesn't rely on a cloud server, doesn't rely on syncing backups, and there is no data connection. _Unless you choose to use the convenient sync feature_ your information is never backed up or synchronized between devices.

## For Any Purpose

Passcloud comes with a variety of built-in customizable password types. Password customization makes your passwords look different, add levels of complexity for better security, and makes your passwords more compatible with specific the password policies.

## Convenience of Sync

Sometimes security must be sacrificed for convenience, this is why Passcloud has an optional and unique sync system. Even with the sync feature enabled Passcloud remains one of the most clever and secure password managers available on the market. 

Passcloud only stores your repeatable information used to generate your passwords and never your passwords, master password, or your sync key. Your repeatable information is uniquely anonymized and encrypted using a huge key derived from your master password and sync key based on the AES256 protocol. Using this over the top methodology you can rest easy knowing your data, even if breached, can _never be used to expose you to any risk_. Without knowing your sync key and your master password, your data is inaccessible, indecipherable, and unusable. **There is simply no way to extract useful information.**

### What data is stored?

Only the following repeatable information is stored:
- Site name
- User profile
- Length of the password 
- Seed number
- Password type
- If the password uses alphanumerics
- If the password removes ambiguous characters
- If the password uses special characters
- If the password uses extended characters
- If the password uses only unique characters
- If the password is forced to change yearly

## Run Your Own Passcloud

Passcloud was made to with strict security culture in mind. As such you shouldn't implicitly trust Passcloud. The Passcloud creator encourages users to deploy their own versions of Passcloud to their own servers. 

#### Security starts with taking responsibility for your own security. 

To begin you'll need to host your Passcloud on your own server. Luckily it's easier than ever to host your own free Passcloud server with [Heroku](https://signup.heroku.com/). Simply click the button below and follow the setup instructions.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/spencerthayer/Passcloud)

You'll also need to create a Firebase database in the [Firebase console](https://console.firebase.google.com/).
- If you don't have an existing Firebase project, sign up, and then click **Add project** and enter either an existing Google Cloud Platform project name or a new project name.
- If you already have apps in your project, click **Add Another App** from the project overview page.
- From the project overview page in the [Firebase console](https://console.firebase.google.com/), click **Add Firebase to your web app**.
- Copy and paste your project's `apiKey` and `databaseURL` in the **settings** within your new app.

# Licensing Information

Passcloud is free software (GPLv3), its algorithm, dependencies, and code have been extensively documented for nearly 10 years. You can view the code for Passcloud yourself over at it's [GitHub](https://github.com/spencerthayer/Passcloud) page, where you are able to provide feedback, submit issues, or even contribute to the code yourself! 

Development testing, which means it's likely broken, can be found at https://passcld.herokuapp.com.

## Terms of Service

These terms are made available under a [Creative Commons Attribution-ShareAlike license](http://creativecommons.org/licenses/by-sa/3.0/).

The user acknowledges and agrees that Passcloud neither makes any representations or warranties with respect to Passcloud products and services nor assumes any liability with respect to its use.

## Privacy Policy

This Privacy Statement for Passcloud products and services describes the details on information that Passcloud collects, uses, shares, and stores; including personal information (i.e., information that personally identifies users, such as name, email address, billing information, or other data that can be reasonably used to infer this information).

COLLECTION AND USE: Passcloud collects only the information the user chooses to send to the Passcloud Firebase server. This information is used to provide users with the Passcloud sync features and is highly encrypted using the AES256 protocol. Connection to the Passcloud Firebase server is strictly anonymous and does not allow anyone to understand who users are, how they use Passcloud or provide any actionable analytics that is relevant to advertisers.

Passcloud fully anonymizes and encrypts all user information and interactions. As such Passcloud does not, and could not, share or sell any information to third parties.

# Version Information
- v2.0.4 - Fixing the mobile icon issues.
- v2.0.3 - General fixes.
- v2.0.2 - Updates to the Material CSS interface.
- v2.0.1 - Changes to an error in the password creation.
- v2.0.0 - Major upgrades:
 - Implementation of the cryptographically secure Mersenne Twister PRNG algorithm.
 - UI/UX changes using Material design methods.
 - Added new passwords types.
 - Added several new password customizations.
 - Firebase database syncing.
- v1.9 - Fixes
- v1.8 - UI updates. Abandoning mobile development.
- v1.7 - Attempt to integrate to Android.
- v1.6 - Attempt to integrate to IOS.
- v1.5 - Changes to get ready for mobile production.
- v1.4 - Changes to the UI, abandoning "Web2.0" look.
- v1.3 - Improvements to the PRNG but considering moving to Mersenne Twister.
- v1.2 - XKCD passwords are a thing!
- v1.1 - PINS! Now all of my debit cards are secure!
- v1.0 - NO MORE PHP! All client-side javascript.
- v0.9 - Almost all PHP has been removed.
- v0.8 - Abandoning PHP framework entirely.
- v0.7 - Experimenting with a working PHP/Javascript combo. 
- v0.6 - Custom cryptographic PRNG algorithm for javascript. 
- v0.5 - Transitioning from PHP  to javascript.
- v0.4 - Password creation customizations.
- v0.3 - Basic features are set up.
- v0.2 - Most bugs are fixed, focus on adding features. 
- v0.1 - Working version, lots of bugs to fix.

## To Do
* [ ] Move slider to the right.
* [ ] Integrate two sections to slider: `data` and `settings`.
* [ ] Retreive and manage data stored on Firebase.
* [ ] Create launch images.
* [ ] Create fav icons.