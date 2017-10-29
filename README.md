Next Change to Make

26/10/17: 
    <!-- (T0001) When herbie dies, slowly decay instead of disapper. (Completed 27/10/17) -->

28/10/17:
    <!-- (T0002) Create generic die function. (Completed 29/10/17) -->
    <!-- (T0003) Create generic decay function. (Completed 29/10/17) -->
        ISSUES:
        <!-- (I0001): Above 2 functions fail with more than one of each species (causing crash) (29/10/17) -->
        <!-- (I0002): While lifeform decays, all of same species (under index of the decaying) freeze and resume movement once the decaying is removed. (29/10/17) -->
    <!-- (T0004) Generate different speeds amoungst creatures upon generation. (29/10/17) -->
        ISSUES:
            <!-- (I0003): When a creature aproaches it's prey, if the distance is not divisible by the creature's speed, it will never reach it. (29/10/17) -->
    (T0005) Regenerate leaves over time.
    (T0006) Background colour change according to time passed (to simulate day and night).
    (T0007) Adjust sight capability to time of day.

29/10/17:
    (T0008) Style start life button to be displayed in the middle of the screen, large, before game begins
    (T0009) Get button to reappear if all life has ceased to exist (apart from leaves)
    (T0010) Display leaderboard on the right, with the following attributes:
        (T0010a) Name of life form,
        (T0010b) Species,
        (T0010c) Health bar,
        (T0010d) Sight,
        (T0010e) Speed
    (T0011) Fade seamlessly between decay images (instead of clunky changes)