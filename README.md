UbiCast MediaServer Atto button plugin
===========================================

Copyright: UbiCast (https://www.ubicast.eu)
License: https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later


Description:
------------
This Atto button plugin allows users to add media from an UbiCast MediaServer in their Moodle course from the Atto editor directly.

* Adding a media

![Adding a media](../assets/insert-media.png)

1. Click on the MediaServer button.
2. Select the media which should be embedded.
3. Click on "insert" and it's done!

* Professor view

![Professor view](../assets/professor-view.jpg)

* Student view

![Student view](../assets/student-view.jpg)


Dependencies:
-------------

* https://github.com/UbiCastTeam/moodle-mod_ubicast


Installation:
-------------

* In the Moodle server, go to the Moodle atto plugins directory: `cd lib/editor/atto/plugins`
* Clone the repository: `git clone https://github.com/UbiCastTeam/moodle-atto_ubicast.git ubicast`
* Visit Moodle as administrator
* Navigate to Dashboard (upgrade your Moodle)
* Navigate to Site administration > Plugins > Text editors > Atto HTML editor > Atto toolbar settings
* Add `ubicast` in the `files` section of the toolbar config (for example, the `files` section may be `files = image, media, recordrtc, managefiles, ubicast`) or add `ubicast = ubicast` at the end.


Development:
-----------

If you don't have anything set up, follow the `Development Environment` setup instructions in https://github.com/UbiCastTeam/moodle-mod_ubicast

Then:

* Copy this folder into the `lib/editor/atto/plugins` folder of your moodle installation.
* In command-line, go to the `yui/src` subfolder of the plugin
* If you don't have it already, install `shifter` globally (`npm install -g shifter` or `yarn global add shifter`)
* Run `shifter --watch`


How does it work?
-----------------

This plugin relies heavily on the https://github.com/UbiCastTeam/moodle-mod_ubicast plugin's LTI video integration mechanism that you can read on in said README.

What the Atto plugin does is only opening a modal asking for the video ID and inserts an iframe the same way the `moodle-mod_ubicast` does.


Relevant Moodle Documentation:
----------------------

* https://docs.moodle.org/dev/Atto (pretty incomplete, sadly)
* https://docs.moodle.org/dev/YUI/Modules
* The `lib/editor/atto/plugins` folder and Ctrl+F are your best friends!
