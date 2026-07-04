# Project 5: Multi-Agent KYC & AML Loan Auditing Swarm

## Goal
Build a collaborative agent board using CrewAI that automates underwriting. Define agents for Intake (parsing documents), KYC (verifying passport names), AML (checking PEP registries), and Credit Underwriting.

## Suggested Directory Structure
```text
prj5_multiagent_kyc_board/
├── main.py                    # Crew execution script
├── agents.py                  # Agent task profiles & goals
├── tools.py                   # Custom APIs (Passport verification, AML lists)
└── input_application.json     # Mock applicant folder
```

## Get Started
1. Run `pip install crewai`.
2. Map your API key variables.
3. Design custom tools matching Day 55 exercises.
