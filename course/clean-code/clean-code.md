# Clean Code: A Handbook of Agile Software Craftsmanship

> Robert C. Martin

## Introduction

* *"Honesty in small things is not a small thing."* : Pay attention to small things, but also to be honest in small things.

* Scrum and agile: focus on quickly bringing product to market

* Total Productive Maintenance(TPM): focus on maintenance

* 80% or software workload is "maintenance".

* 5S principles: Seiri(organization), Seiton(tidiness), Seiso(shine), Seiketsu(standardization), Shutsuke(self-discipline)

* Craftsmanship: knowledge and work

## Chapter 1. Clean Code

### There will be code

Disappearing code with the help of machine won't be happened. Code is language, expressing the requirements.

### Bad code

* Bad code brings the company down.

* LeBlanc's law: Later equals never.

### The total cost of owning a mess

* Spending time keeping code clean is not just cost effective; a matter of professional survival.

### Attitude

* Defend the code with equal passion to managers is our job

* Professional doctors tell the truth clearly patients.

### The primal conundrum

The only way to go fast, make
 the deadline is to keep the code as clean as possible at all times.

### The art of clean code

*"code-sense"* help choosing the best variation and guide a programmer to plot a sequence of behavior preserving transformations to get from here to there.

### What is clean code

Beautiful code makes the language look like it was made for the problems.

### Schools of thought

Learn what the particular master teaches, exclude any other master's teaching, grow and become a specific master.

### We are authors

You are an an author, writing for readers who will judge your effort.

Reading 10 - Writing: 1, so making it easy to read actually makes it easier to write.

### The boy scout rule

> Leave the campground cleaner than you found it.

* Can you imagine working on a project where the code simply got better as time passed?
* Do you believe that any other options is professional?
* Isn't continuous improvement an intrinsic part of professionalism?

### Prequel and principles

Agile software development: Principles, Patterns, and Practices(PPP) (2000)

* Singaple responsibility prinicple(SRP), Open closed principle(OCP), dependency inversion principle(DIP).

## Chapter 2. Meaningful Names

### Use intention revealing names

The name should reveal intent.

#### Case 1

Choose a name that specifies what is being measured and the unit of that measurement.

Bad:

```java
int d; 
```

Good:

```java
int elaspedTimeInDays;
int daysSinceCreation;
```

### Case 2

Tell what this code is doing.

Bad:

```java
public List<int[]>getThem(){
  List<int[]> list1 = new ArrayList<int[]>();
  for(int[]x: theList)
    if(x[o] == 4)
      list1.add(x);
  return list1;
}
```

The code implicitly requires that we know the answers to below questions;

1. What kinds of things are in `theList`?
2. What's the significance of the zeroth subscript of an item in the `theList`?
3. What's the significance of the value `4`?
4. How would I use the list being returned?

Good:

If we're working in a mine sweeper game,

```java
public List<int[]>getFlaggedCells(){
  List<int[]> flaggedCells = new ArrayList<int[]>();
  for(int[] cell: gameBoard)
    if(cell[STATUS_VALUE] == FLAGGED)
      flaggedCells.add(cell);
  return flaggedCells;
}
```

The better way:

Change `[STATUS_VALUE] == FLAGGED` to `cell.isFlagged()` to include an intention-revealing function.

```java
public List<int[]>getFlaggedCells(){
  List<int[]> flaggedCells = new ArrayList<int[]>();
  for(int[] cell: gameBoard)
    if(cell[STATUS_VALUE] == FLAGGED)
      flaggedCells.add(cell);
  return flaggedCells;
}
```

### Avoid disinformation

* Must avoid leaving false clues that obscure the meaning of code.

* If the container, `accountList` is not actually a List, it may leadto false conclusion. Instead, use `accountGroup` or `bunchOfAccounts`.

* Spelling similar concepts similarly is information. (naming consistency)

* Don't use `l` or `O` as variable names, esp in combinations.

### Make meaningful distinctions

Number-series naming(a1, a2, ..aN) is noninformative; no clue to the author's intention.

Using Noise words(e.g `ProductInfo` nad `ProductData`) is meaningless distinction.
