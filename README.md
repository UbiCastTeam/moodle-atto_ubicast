Easycast MediaServer Atto button plugin
===========================================

Copyright: UbiCast (http://www.ubicast.eu)
License: http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later

Description:
------------
This Atto button plugin allows users to add media from an EasyCast MediaServer in their Moodle course from the Atto editor directly.


Dependencies:
-------------

* https://github.com/UbiCastTeam/moodle-mod_easycastms


Installation:
-------------

* Extract content of zip archive
* Upload extracted folder to lib/editor/atto/plugins
* Visit Moodle as administrator
* Navigate to Dashboard (upgrade your Moodle)
* Navigate to Site administration > Plugins > Text editors > Atto HTML editor > Atto toolbar settings
* Add the 'easycastms' in Toolbar config.

Development:
-----------

* Copy this folder into the `lib/editor/atto/plugins` folder of your moodle installation.
* In command-line, go to the `yui/src` subfolder of the plugin
* If you don't have it already, install `shifter` globally (`npm install -g shifter` or `yarn global add shifter`)
* Run `shifter --watch`

Relevant Documentation:
----------------------

* https://docs.moodle.org/dev/Atto (pretty incomplete, sadly)
* https://docs.moodle.org/dev/YUI/Modules
* The `lib/editor/atto/plugins` folder and Ctrl+F are your best friends!
