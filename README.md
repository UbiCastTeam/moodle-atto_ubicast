UbiCast MediaServer Atto button plugin
===========================================

Copyright: UbiCast (https://www.ubicast.eu)
License: https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later


Description:
------------
This Atto button plugin allows users to add media from an UbiCast MediaServer in their Moodle course from the Atto editor directly.

* Adding a media

![Adding a media](../assets/add-media.png)

1. Click on the MediaServer button.
2. Click on "select a resource" and choose which media should be embedded.
3. Click on "insert" and it's done!

* Professor view

![Professor view](../assets/professor-view.png)

* Student view

![Student view](../assets/student-view.png)


Dependencies:
-------------

* https://github.com/UbiCastTeam/moodle-mod_easycastms


Installation:
-------------

* Extract content of zip archive
* Upload extracted folder to `lib/editor/atto/plugins`
* Visit Moodle as administrator
* Navigate to Dashboard (upgrade your Moodle)
* Navigate to Site administration > Plugins > Text editors > Atto HTML editor > Atto toolbar settings
* Add the `easycastms = easycastms` in Toolbar config.


Development:
-----------

If you don't have anything set up, follow the `Development Environment` setup instructions in https://github.com/UbiCastTeam/moodle-mod_easycastms

Then:

* Copy this folder into the `lib/editor/atto/plugins` folder of your moodle installation.
* In command-line, go to the `yui/src` subfolder of the plugin
* If you don't have it already, install `shifter` globally (`npm install -g shifter` or `yarn global add shifter`)
* Run `shifter --watch`


How does it work?
-----------------

This plugin relies heavily on the https://github.com/UbiCastTeam/moodle-mod_easycastms plugin's LTI video integration mechanism that you can read on in said README.

What the Atto plugin does is only opening a modal asking for the video ID and inserts an iframe the same way the `moodle-mod_easycastms` does.


Relevant Moodle Documentation:
----------------------

* https://docs.moodle.org/dev/Atto (pretty incomplete, sadly)
* https://docs.moodle.org/dev/YUI/Modules
* The `lib/editor/atto/plugins` folder and Ctrl+F are your best friends!
