import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

type Props = { className?: string };

const SocialFooter = ({ className }: Props) => (
  <footer className={className}>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.linkedin.com/in/jhonattasferreira/"
      aria-label="Go to my LinkedIn profile"
    >
      <FaLinkedin />
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/JhonattasFerreira"
      aria-label="Go to my GitHub profile"
    >
      <FaGithubSquare />
    </a>
  </footer>
);

export default SocialFooter;
