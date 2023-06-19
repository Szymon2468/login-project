import Link from 'next/link';
import styles from '../styles/globals.module.scss';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <Link href='/'>
          <li>home</li>
        </Link>

        <Link href='/register'>
          <li>register</li>
        </Link>

        <Link href='/change-password'>
          <li>change password</li>
        </Link>

        <Link href='/reset-password'>
          <li>forgot password</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
