# jspsych-nv-core

This is a student project of Mariia and Sofia under super vision of Natalia.

## This experiment consists of two main parts

1. A Lexical Decision (LD) task
2. A Picture Naming (PN) task where the participant names pictures. The participant
   needs to name the picture according to the national British and Dutch flags.

The tasks need to be done in counterbalanced order. So, for e.g. odd participants
the LD is administered first and then the PN second and for even numbered the
other way around.

The LD task is in the ld folder and the PN task will be put in the pn subfolder.

## Experiment setup

This experiment consists 2 experiments as described above. In order for the
participants to go through the experiment in counter balanced order. A
third "experiment" is added. It does two things, one collect the informed consent
because it doesnt make sense to continue without it. And secondly,
it counterbalances the order of the two experiments above. So e.g. pp1 does
ld first pn second, and pp 2 goes through them in reversed order.

## Experiment server
The code of all experiments is in one repository. The informed consent it at
the root. The LD experiment is in the ld/ subdirectory and the PN is in the pn/
subfolder. So the entire code can be posted in one folder at the experiment
server. The experiments will guide the participant to go through all of the
experiments.

## Data server
In contrast to the experiment server, the data server should be setup differently.
It was desireable to separate the output of the PN and LD tasks. Hence, two
experiments must be created and one additional for the informed consent.

I would suggest to create three experiments on the dataserver; something like
the following:

1. **core_ic**, for the informed consent. As its aranges the counterbalancing
   Two groups must be added:
   1. **ld** For the participant that do the ld first.
   2. **pn** For the participant that do the pn first.
   Make sure to put the ACCESS_KEY to be collected from the data server
   in /globals.js
2. **core_ld**, for the lexical descision experiment. I don't know whether
   grouping is used. If so add them as is consisten with the experiment.
   Make sure to update the ACCESS_KEY in ld/globals.js
3. **core_pn**, for the picturenaming/language switching task.
   Two groups should be added:
   1. **en** to start with english in the first block
   2. **nl** to start with dutch
   Make sure to update the ACCESS_KEY in the pn/globals.js
