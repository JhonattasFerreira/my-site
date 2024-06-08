import Post from "../../../../../../components/Post";
import ImageResponsive from "../../../../../../components/ImageResponsive";

import photo1 from "./whereIsSite.png";
import photo2 from "./allTheProcess.png";

const BlogPost = () => {
  return (
    <Post title={"How to Host a Website"} date={"2024-05-08"}>
      <>
        <p>
          Buying a domain/hosting a website is a trivial task, a few
          configurations here and there, and voilà, a brand new website is up
          and running. But do you know how to do that?
        </p>
        <h2>Where is the website?</h2>

        <p>
          You open your browser, type the website www.google.com, and hit Enter.
          But how does the browser know where to find the IP address where
          Google is hosted?
        </p>
        <p>
          Your internet server has something called a Recursive Resolver that
          takes care of discovering the IP. When you access a URL, a request is
          made to this Recursive Resolver.
        </p>
        <p>The Recursive Resolver asks to one of the 13 root servers:</p>

        <p>— Hey root-server, what's the IP of the website www.google.com?</p>
        <p>— Dude, I don't know, but I know the IP of its TLD.</p>
        <p>— Perfect!</p>

        <p>But, what is a TLD?</p>

        <h3>TLD</h3>

        <p>
          Each website has a 'full name' called a Fully Qualified Domain Name
          (FQDN), which ends with a dot. In the case of Google, the FQDN is{" "}
          <strong>www.google.com.</strong>. The root server reads the site from
          back to front looking for this '.' in the FQDN. After the dot, you
          find the Top-Level Domain (TLD), which in Google's case is '.com'.
        </p>

        <p>The TLDs are divided into three categories:</p>
        <ul>
          <li>
            ccTLDs (Country Code Top-Level Domains), which are reserved for
            countries. e.g., .br, .ca...
          </li>
          <li>
            gTLDs (Generic Top-Level Domains), which are used generically. e.g.,
            .com, .net...
          </li>
          <li>
            sTLDs (Sponsored Top-Level Domains), intended for specific
            communities and managed by designated organizations. e.g., .aero,
            .museum...
          </li>
        </ul>

        <p>
          The root server returns the IP of the .com TLD to the Recursive
          Resolver. The Recursive Resolver asks the .com TLD:
        </p>

        <p>— Hey .com TLD, what's the IP of the website www.google.com?</p>
        <p>
          — Dude, I don't know, but I know the IP of its Authoritative Server.
        </p>
        <p>— Perfect!</p>

        <p>But, what is an Authoritative Server?</p>

        <h3>Authoritative Server</h3>

        <p>
          The Authoritative Server, as the name suggests, is the server that has
          authority over the website. It holds the specific DNS records for the
          domain, including the IP address records. In the end, it knows where
          the final IP is located.
        </p>

        <p>So the Recursive Resolver asks the Authoritative Server:</p>

        <p>
          — Hey Authoritative Server, what's the IP of the website
          www.google.com?
        </p>
        <p>— Dude, I KNOW!! It 's 216…</p>
        <p>— Finally!!</p>

        <p>With the final IP, the browser can access Google.</p>

        <ImageResponsive
          src={photo1}
          alt={
            "A diagram image showing the sequence from the root server, to the TLD, and ending at the Authoritative Server."
          }
        />

        <h2>But, how does this relate to Web Hosting?</h2>

        <p>
          Everything! You buy a domain from a Registrar, like GoDaddy, and it's
          responsible for passing this information to the Registry (each country
          has its own Registry). The Registry is responsible for putting your
          domain in the TLD. With this, in the Registrar you can choose to point
          to the Authoritative Server of your choice (e.g., Vercel).
        </p>

        <ImageResponsive
          src={photo2}
          alt={
            "An image of a diagram showing the sequence from the Registrant, to the Registrar, to the Registry, and ending at the TLD."
          }
        />

        <p>
          In the end, to have a website, you just need to buy a domain and in
          the domain settings, choose the authoritative server you want to use.
        </p>
      </>
    </Post>
  );
};

export default BlogPost;
