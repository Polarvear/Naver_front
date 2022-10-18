<?php
// define('WP_CACHE', true);
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'newsletter_2016_10');

/** MySQL database username */
// define('DB_USER', 'root');
define('DB_USER', 'dhlkorea');

/** MySQL database password */
define('DB_PASSWORD', 'Dhl2015kr!');
// define('DB_PASSWORD', 'on!yforte$t');

/** MySQL hostname */
// define('DB_HOST', '210.90.41.97:8888');
define('DB_HOST', '115.68.227.161:3306');
// define('DB_HOST', '106.244.4.146:8888');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

define('FS_METHOD', 'direct');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'LgUqXwt P`I3Cr9S@PXO,[}o56F&B|3bnzj*2 -k86-[.V-qe(~5}F ojb{<w|Vu');
define('SECURE_AUTH_KEY',  'hL3B<iOUT@},$~.&27mSF~WcsL&+@J$kn-SWf1#BW_6;G? ,fhyr63k,}hsF&z)S');
define('LOGGED_IN_KEY',    'M+b^~HArTD7|,(RO%;L~3cp~@BO+4~G|8x`g7!?$cHBjN_,yNH-CA8kMT8f?$%ck');
define('NONCE_KEY',        'k92T+ns7lYxbW@G$|.*2}G;wgZzxx+{Zow1i6Ips0N~G9E&M/iLBtueP(Kq:>f*#');
define('AUTH_SALT',        'fR;.()Fi~f]95[lD|g.Um[f{uS&g0lEO:|8~*|%gUaZA(S<[.tXUcu+qH|F;i*m6');
define('SECURE_AUTH_SALT', '|6@Z`La o[gA-I~c3,s^sAkk}^&NG+uTE4d$|89.0l64mmHWm>3lu)vf>@vzBebZ');
define('LOGGED_IN_SALT',   '7B6B6t gl0A> }?jn_)9rb~vXFP6U Zl@KKh]7xH.E*oL2bpW;YX;Y3J%JG-NP`k');
define('NONCE_SALT',       'PWDB`{)speHw%8JOjkm}+H|&SZIUA)V2cl_ Mm]7qqx`++.P%M-XT0D*G`{>j)j|');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');


/**post revision                */
define('WP_POST_REVISION', 5);
