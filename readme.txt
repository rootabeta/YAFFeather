===============================
YAFFeather v3.6.9.2

Derivative extension of SweezeBreeze, with removed and added stuff, tailored towards raiders/tags

================================
KEY LIST:

A - Refresh page
T - Set template-overall=none for faster pageloads
Q - Go back
V - Check if your nation updated
S - Endorse nation
L - Unendorse nation
O - Ban nation
K - Eject region
R - Confirm WA join
F - Move to region in current tab
B - Move to suspicious
E - Apply/resign to/from WA
Z - Go to current region page
X - Copy current nation URL to clipboard
D - Appoint yourself as RO/Dismiss other ROs
===============================
3.6.9.2
/!\ Removed legacy restricted action (reports page) 
Enhanced dismissal to account for maxed-out RO slots

3.6.9.1
Changed behavior of E key to accept WA invite when looking at a WA invitation, rather than attempting to apply to the WA

3.6.8.1
Added option to set custom JP

3.6.7.2
Did resignation even more betterer so duplicates can't happen despite not tampering with the form.
IDK why I didn't add this sooner.

3.6.7.1
Did resignation even better so simultaneity is no longer an issue

3.6.6.5
Reinforced simultaneity on resignation

3.6.6.4
Solved RO race condition, for realsies this time
Minor bugfixes

3.6.6.3
Remapped self-check from G to V

3.6.6.2
Added error handling during RO process

3.6.6.1
Updated icons for YAFFeather Beta

3.6.5
Finalized default RO titles for successor and governor (Task Failed Successorly and Maintain A, respectively)
Attempted minor streamlining to prevent race conditions

3.6.4
Fixed a bug that prevented going to the RO appointing page if looking at your own nation page

3.6.3
Fixed a bug that caused dismissal to fail if the person who appointed one or more RO has since CTEd

3.6.2
Made it harder to accidentally dismiss yourself

3.6.1
Added settings page to customize RO titles

3.6.0
Added round-robin RO dismissal after successful appointment

3.5.9
Re-enabled applying to WA

3.5.8
Made the UN page template=none by default, potentially accelerating switch speed

3.5.7
Added workaround for template=none with the self-doss page

3.5.6
Made RO appoint in 2 keys, instead of 3
Attempted minor bugfix with KeyZ to go to current region - will see if it works in the field

3.5.5
Rolled back changes to move key after user testing

3.5.4
Added refresh functionality to move key
Fine-tuned functionality under the hood

3.5.3
Moved nation-update feed to G for ease of use mid-tag

3.5.2
Re-enabled applying to WA

3.5.1
Bugfixes on pressing Z on region move, and pressing E again after confirming a WA application

3.5
Seperated endorsements from unendorsements
Made X copy the nation of the currently viewed WA application, if not yet fully applied 
Made R copy the nation of the WA application to clipboard immediately before applying
Made RO dismissal remove all authorities from successors, who cannot be fully removed by an executive WA (Thanks to NotAName for the code on this one)
Brought keystrokes to resign from 3 to 2 (e e enter -> e e) (Thanks to NotAName for this code too)

3.4
Jumped the versioning shark during migration from stock Feather branch to YAFFeather
Added template-overall functionality
Changed nation URL copying from V to X
Changed default RO title from Raider Unity to Supreme Overlord

=======

3.1
prepared for publishing on chrome web store
updated jump point to suspicious
changed RO name
---


3.0
Removed mousetrap, rewritten to use pure javascript instead
---
2.2
Rewrote the script in Mousetrap due to the deprecation of the keyCode method as well as for code cleanliness sake, switched from jQuery in favor of Cash to save ~60KB
---
2.1
Updated to current Feather - Alterations Made By Miravana
Removed Dossier/Reports Functionality
Changed Keybinds and Regional Information
---
2.0 
Updated to current SweezeBreeze - Script By Sweeze
---
1.2
Re-arranged keys so less hand moving necessary.
Added icon.
---
1.1
added regional officer functionality
---
1.0
added confirm WA join feature
fixed join/resign feature
removed dossier+defender stuff
changed spear danes to plum island+le club des cinq
