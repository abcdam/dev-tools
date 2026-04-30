## Overview
Small everyday utilities that can be broadly categorized into 3 groups: ECMAscript wrappers, NodeJS wrappers and type guards. The two wrapper groups are mostly a convenience shortcut for ROP based composition (railway-oriented programming). The underlying built-ins rely on the `this` context, making them an annoyance to work with in such pipelines.

Function symbols postfixed with an underscore signal equivalence with the respective NodeJS/ECMAscript implementation (with slight variance for ergonomic reasons). 
While it might look a bit confusing at initial glance, the visual "otherness" conveys intent extremely well -> "I'm using a wrapped built-in". This is especially useful in mixed-usage contexts, where wrappers and utilities exported by `adt/option` and `adt/result` are utilized in tandem -> e.g. `map` differs in semantic meaning between the `Option<T>`/`Result<T,E>` and ECMAscript implementation.

There is no intent to provide full built-in coverage.