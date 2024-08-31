---
title: How to Host a Website
date: "2024-05-08"
gif: /how-to-hosting-a-website/computer.webp
altTextGif: A GIF of an old computer with pixel art.
---

![A GIF of an old computer with pixel art.](/how-to-hosting-a-website/computer.webp)

Buying a domain/hosting a website is a trivial task, a few configurations here and there, and voilà, a brand new website is up and running. But do you know how to do that?

## Where is the website?

You open your browser, type the website www.google.com, and hit Enter. But how does the browser know where to find the IP address where Google is hosted?

Your internet server has something called a Recursive Resolver that takes care of discovering the IP. When you access a URL, a request is made to this Recursive Resolver.

The Recursive Resolver asks to one of the 13 root servers:

— Hey root-server, what's the IP of the website www.google.com?

— Dude, I don't know, but I know the IP of its TLD.

— Perfect!

But, what is a TLD?

### TLD

Each website has a 'full name' called a Fully Qualified Domain Name (FQDN), which ends with a dot. In the case of Google, the FQDN is **www.google.com.**. The root server reads the site from back to front looking for this '.' in the FQDN. After the dot, you find the Top-Level Domain (TLD), which in Google's case is '.com'.

The TLDs are divided into three categories:

- ccTLDs (Country Code Top-Level Domains), which are reserved for countries. e.g., .br, .ca...
- gTLDs (Generic Top-Level Domains), which are used generically. e.g., .com, .net...
- sTLDs (Sponsored Top-Level Domains), intended for specific communities and managed by designated organizations. e.g., .aero, .museum...

The root server returns the IP of the .com TLD to the Recursive Resolver. The Recursive Resolver asks the .com TLD:

— Hey .com TLD, what's the IP of the website www.google.com?

— Dude, I don't know, but I know the IP of its Authoritative Server.

— Perfect!

But, what is an Authoritative Server?

### Authoritative Server

The Authoritative Server, as the name suggests, is the server that has authority over the website. It holds the specific DNS records for the domain, including the IP address records. In the end, it knows where the final IP is located.

So the Recursive Resolver asks the Authoritative Server:

— Hey Authoritative Server, what's the IP of the website www.google.com?

— Dude, I KNOW!! It 's 216…

— Finally!!

With the final IP, the browser can access Google.

![A diagram image showing the sequence from the root server, to the TLD, and ending at the Authoritative Server.](/how-to-hosting-a-website/whereIsSite.png)

## But, how does this relate to Web Hosting?

Everything! You buy a domain from a Registrar, like GoDaddy, and it's responsible for passing this information to the Registry (each country has its own Registry). The Registry is responsible for putting your domain in the TLD. With this, in the Registrar you can choose to point to the Authoritative Server of your choice (e.g., Vercel).

![An image of a diagram showing the sequence from the Registrant, to the Registrar, to the Registry, and ending at the TLD.](/how-to-hosting-a-website/allTheProcess.png)

In the end, to have a website, you just need to buy a domain and in the domain settings, choose the authoritative server you want to use.
