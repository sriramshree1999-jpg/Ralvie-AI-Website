export type ProductivityFeatureKey =
  | 'automatic-activity-tracking'
  | 'time-logs'
  | 'screen-captures'
  | 'tasks'
  | 'projects'
  | 'dashboard';

export type ProductivityFeaturePage = {
  key: ProductivityFeatureKey;
  title: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  heroLead: string;
  heroBody: string;
  supporting: string[];
  introEyebrow: string;
  introTitle: string;
  introText: string;
  highlights: Array<[string, string, string]>;
  stories: Array<{ eyebrow: string; title: string; text: string; points: string[] }>;
  comparison: Array<[string, string]>;
  process: string[];
  responsibility: { eyebrow: string; title: string; text: string; points: string[] };
  faqs: Array<[string, string]>;
  finalEyebrow: string;
  finalTitle: string;
  finalText: string;
};

export const productivityFeaturePages: Record<ProductivityFeatureKey, ProductivityFeaturePage> = {
  'automatic-activity-tracking': {
    key: 'automatic-activity-tracking',
    title: 'Automatic Activity Tracking Software | Ralvie AI Productivity',
    description: 'Automatically capture workplace activity, understand active and idle time, review application usage, manage work schedules, and turn everyday activity into clearer productivity intelligence with Ralvie AI Productivity.',
    eyebrow: 'Automatic activity tracking',
    heroTitle: "Automatic Activity Tracking for <em><span>Smarter Work Visibility.</span></em>",
    heroLead: '',
    heroBody: 'Sundial records application activity within your schedule, detects idle time, and clearly shows employees what is being captured.',
    supporting: ['Sundial desktop app', 'Activity timeline', 'Startup controls', 'Idle detection', 'Work schedules', 'Employee visibility'],
    introEyebrow: 'The Sundial desktop experience',
    introTitle: "Automatic tracking that stays <em><span>visible and configurable.</span></em>",
    introText: "Activities, General Settings, and Schedule give employees one clear place to review their timeline and understand how automatic tracking is configured.",
    highlights: [
      ["clock", "Activities", "Review a chronological timeline of applications and durations."],
      ["bolt", "Launch on startup", "Start Sundial automatically with the employee’s system."],
      ["coffee", "Idle detection", "Identify configured inactive periods with clear thresholds."],
      ["calendar", "Schedule controls", "Record only during selected working days and hours."],
      ["globe", "Language preferences", "Choose the preferred desktop-app language."],
      ["shield-check", "Visible boundaries", "Show when tracking is active and when it stops."],
    ],
    stories: [
      { eyebrow: "Activities screen", title: "See the day as a <em><span>clear application timeline.</span></em>", text: "Sundial lists each relevant application session, its duration, and the work context around it so employees can review the day without rebuilding it from memory.", points: ["Chronological application activity", "Clear session durations", "A live view employees can understand"] },
      { eyebrow: "General settings", title: "Keep the desktop experience <em><span>under control.</span></em>", text: "Choose whether Sundial launches on startup, enable idle detection, select a language, and check the installed version from one simple settings view.", points: ["Launch with the system", "Configurable idle detection", "Language and update controls"] },
      { eyebrow: "Schedule", title: "Record activity only inside <em><span>defined work hours.</span></em>", text: "Select working days and start and end times so automatic activity tracking follows the employee’s real schedule.", points: ["Day-by-day configuration", "Clear start and end times", "Tracking stops outside the schedule"] },
    ],
    comparison: [["Manual timer starts and stops", "Relevant activity captured automatically"], ["Workday rebuilt from memory", "Chronological work history"], ["Application data in isolation", "Applications connected with work context"], ["Fixed assumptions about schedules", "Configurable workplace rules"], ["Hours treated as productivity", "Activity interpreted with projects and outcomes"]],
    process: ["Install Sundial", "Set general preferences", "Choose working days and hours", "Review the activity timeline", "Connect history with Ralvie insights"],
    responsibility: { eyebrow: "Context over surveillance", title: "Better visibility starts with <em><span>clear workplace rules.</span></em>", text: "Activity should support better conversations—not become a simplistic employee score.", points: ["Explain what is collected and why", "Use role-based visibility", "Interpret activity alongside complexity, quality, collaboration, and outcomes"] },
    faqs: [["What is Ralvie Automatic Activity Tracking?", "Ralvie Sundial captures applicable workplace activity according to your organization’s configured settings."], ["Do employees need to manually start timers?", "No. Ralvie is designed to reduce dependence on manual timers."], ["Can we define employee working hours?", "Yes. Organizations can configure applicable work schedules and business hours."], ["Does Ralvie support offline activity?", "Where supported, activity can be captured locally and synchronized later."], ["Can activity connect with projects and tasks?", "Yes. Relevant activity can provide context for AI-assisted project and task mapping."], ["Is Ralvie employee surveillance software?", "Ralvie is a productivity and work-intelligence platform. Activity should be interpreted with role, workload, complexity, quality, progress, and outcomes."]],
    finalEyebrow: "Automatic work intelligence",
    finalTitle: "Understand Where Work Time Goes—<em><span>Automatically.</span></em>",
    finalText: "Stop asking employees to reconstruct every hour. Let everyday activity create the context.",
  },
  'time-logs': {
    key: 'time-logs',
    title: 'AI Time Logs & Work Activity Records | Ralvie AI Productivity',
    description: 'AI time tracking software for employee time logs, timesheet-ready work records, project time, task effort, application activity, and productivity reporting. Review tracked activity and logged work without rebuilding the day from memory.',
    eyebrow: 'AI-powered time logs',
    heroTitle: "Time Logs That Turn Daily Work Into <em><span>Clear Records.</span></em>",
    heroLead: "",
    heroBody: "See how workdays unfold with one clear view of activity, logged work, projects, tasks, apps, and time.",
    supporting: ["Tracked activity", "Logged activity", "Project context", "Task context", "Work-time history", "AI productivity intelligence"],
    introEyebrow: "From activity to clear time records",
    introTitle: "<em><span>Smarter time logs</span></em> for better work visibility.",
    introText: 'A workday rarely happens in one place. Ralvie creates a clearer record so employees and managers can understand how time was distributed.',
    highlights: [['clock', 'Chronological history', 'See when work happened and what followed.'], ['bolt', 'Tracked activity', 'Review automatically captured workplace context.'], ['list-check', 'Logged activity', 'Organize work into structured records.'], ['folder', 'Project time', 'Understand which projects received attention.'], ['target', 'Task effort', 'See the work inside every project.'], ['chart-bar', 'Focus patterns', 'Recognize uninterrupted work and switching.']],
    stories: [
      { eyebrow: 'Two complementary views', title: 'Tracked activity and logged work in one clear day.', text: 'Use automatically captured activity alongside structured work records to understand both what happened and what the work supported.', points: ['Applications and windows', 'Project and task associations', 'Active, idle, and offline context'] },
      { eyebrow: 'Activity history', title: 'See the workday as a timeline.', text: 'Review when work started, how long it continued, which tools were active, and what happened next.', points: ['Understand every work session', 'Compare days and selected periods', 'Review without rebuilding from memory'] },
      { eyebrow: 'Time distribution', title: 'Answer more than “how long?”', text: 'See which projects and tasks received effort, where the day became fragmented, and how work patterns change over time.', points: ['Project and task time', 'Application context', 'Better workload and planning conversations'] },
    ],
    comparison: [['Time reconstructed from memory', 'Work history ready to review'], ['Calendar and email searches', 'Connected chronological context'], ['Manual timers for every change', 'Low-friction activity visibility'], ['Project totals without detail', 'Project and task-level time'], ['Hours viewed without context', 'Time interpreted with the surrounding work']],
    process: ['Work happens', 'Relevant activity is captured', 'Time history is created', 'Project and task context is added', 'Employees review and finalize'],
    responsibility: { eyebrow: 'Responsible time visibility', title: 'Don’t turn time into a performance score.', text: 'Time is useful context, but productivity also depends on quality, complexity, collaboration, outcomes, and role.', points: ['Give employees access to their own history', 'Respect schedules and permissions', 'Use time to improve planning and workload conversations'] },
    faqs: [['What are Ralvie Time Logs?', 'Ralvie Time Logs are structured employee time logs and work activity records that bring tracked activity, logged work, applications, projects, tasks, and time-tracking context into one reviewable history.'], ['What is the difference between tracked and logged activity?', 'Tracked Activity is captured through Sundial as time-tracking context; Logged Activity is a structured work record that can be reviewed with project, task, application, and timesheet details.'], ['Do employees create every log manually?', 'No. Ralvie reduces manual time entry and timesheet reconstruction by using captured work activity as supporting context for employee time logs.'], ['Can Time Logs connect with projects and tasks?', 'Yes. Work history can be associated with relevant projects, task-level time, billable work, and delivery context.'], ['Can Time Logs help create timesheets?', 'Yes. Captured work history supports AI-assisted timesheet workflows, time tracking review, and more accurate project time records.'], ['Can remote and hybrid teams use Time Logs?', 'Yes. Ralvie supports remote, hybrid, office-based, distributed, and project-based teams that need clearer employee time tracking and productivity visibility.']],
    finalEyebrow: 'Clearer work records. Better productivity context.',
    finalTitle: 'Turn Every Workday Into a Time Record You Can Actually Understand.',
    finalText: 'Stop reconstructing work from memory. Review the history, connect the context, and build better time records.',
  },
  'screen-captures': {
    key: 'screen-captures',
    title: 'Employee Screen Capture & Visual Work Activity | Ralvie AI Productivity',
    description: 'Add visual context to workplace activity with Ralvie AI Productivity Screen Captures while maintaining clear organizational controls and privacy boundaries.',
    eyebrow: 'Screen captures',
    heroTitle: "Screen Captures That Add <em><span>Visual Context</span></em> to Work Activity.",
    heroLead: "",
    heroBody: "When enabled and configured, Screen Captures add visual context to time records—helping employees and managers understand the applications, projects, tasks, and work behind each moment.",
    supporting: ["Visual work context", "Capture gallery", "Activity timeline", "Project visibility", "Configurable controls", "Responsible work tracking"],
    introEyebrow: "Add context to the workday",
    introTitle: "<em><span>Visual work records</span></em> for better productivity clarity.",
    introText: 'A time entry might say “three hours spent working.” Screen Captures can help explain what happened during those three hours.',
    highlights: [['squares', 'Organized gallery', 'Review captures by person, date, and time.'], ['clock', 'Chronological context', 'Understand how visual activity changed.'], ['monitor', 'Application visibility', 'See supported workplace screens and tools.'], ['folder', 'Project context', 'Connect visual records with relevant initiatives.'], ['target', 'Task context', 'Add detail around work in progress.'], ['shield-check', 'Privacy controls', 'Configure schedules, access, and boundaries.']],
    stories: [
      { eyebrow: 'Capture gallery', title: 'Review visual work context in one organized view.', text: 'Browse authorized captures by employee, date, time period, application, project, and task context.', points: ['Grouped chronological records', 'Search and filter controls', 'Clear application labels'] },
      { eyebrow: 'Configured visibility', title: 'Monitor specific screens with clear controls.', text: 'Apply capture settings selectively and within defined workplace schedules.', points: ['Enable only where required', 'Role-based access', 'Transparent schedule configuration'] },
      { eyebrow: 'Connected context', title: 'See the work behind the time record.', text: 'Use visual context alongside Time Logs, projects, tasks, AI-assisted mapping, summaries, and reports.', points: ['Reduce guesswork', 'Support work review', 'Keep screenshots as supporting context'] },
    ],
    comparison: [['Only start, end, and duration', 'Optional visual work context'], ['Screens scattered without order', 'Chronological capture gallery'], ['No link to project work', 'Project and task associations'], ['Always-on assumptions', 'Configurable schedules and access'], ['Screenshot used as judgment', 'Visual record treated as supporting context']],
    process: ['Define a legitimate use case', 'Configure people and schedules', 'Capture supported work screens', 'Organize the gallery', 'Review with broader work context'],
    responsibility: { eyebrow: 'Visual data requires stronger boundaries', title: 'Make Screen Capture transparent to employees.', text: 'Screens may contain confidential information. Deploy this feature selectively, transparently, and according to workplace, security, privacy, and legal requirements.', points: ['Communicate what is captured and why', 'Limit access to authorized roles', 'Never use one screenshot as a performance metric'] },
    faqs: [['What are Ralvie Screen Captures?', 'Optional visual workplace context available when enabled and configured by the organization.'], ['Can Screen Captures be disabled?', 'Yes. The feature should only be enabled where required.'], ['Can captures follow work schedules?', 'Yes. Screen Capture workflows should follow appropriate schedules and workplace boundaries.'], ['Can captures connect with Time Logs?', 'Yes. They can provide visual context alongside relevant work history.'], ['Can captures contain sensitive information?', 'Yes. Organizations must evaluate privacy, security, confidentiality, and legal requirements.'], ['Are screenshots designed to measure performance?', 'No. A screenshot is only supporting context and cannot determine productivity or performance.']],
    finalEyebrow: 'Visual work context',
    finalTitle: 'Add More Context to the Work Behind the Time.',
    finalText: 'Use optional visual context to understand activity while keeping workplace boundaries clear and responsible.',
  },
  tasks: {
    key: 'tasks',
    title: 'AI Task Management & Work Tracking | Ralvie AI Productivity',
    description: 'Create, organize, track, and understand tasks with Ralvie AI Productivity. Connect daily work activity with projects, monitor task progress, understand effort, and generate reports.',
    eyebrow: 'AI-powered task management',
    heroTitle: "Task Tracking That Connects Daily Work With <em><span>Project Progress.</span></em>",
    heroLead: "Create, organize, and track tasks with the project, ownership, and work context needed to keep delivery moving.",
    heroBody: "",
    supporting: ["Task creation", "Task status", "Project context", "AI task mapping", "Work activity", "Task reports"],
    introEyebrow: "Task management with work context",
    introTitle: "Turn everyday work into <em><span>visible task progress.</span></em>",
    introText: 'Traditional task tools tell you what needs to be done. Ralvie adds the context behind To Do, In Progress, and Done.',
    highlights: [['plus', 'Structured creation', 'Define work with project and owner context.'], ['users', 'Clear ownership', 'Assign responsibility to the right people.'], ['target', 'Priority & status', 'Keep attention on what matters most.'], ['folder', 'Project connection', 'Make every task part of a larger goal.'], ['sparkles', 'AI task mapping', 'Use activity to suggest task associations.'], ['chart-bar', 'Effort visibility', 'Understand the work behind every status.']],
    stories: [
      { eyebrow: 'Create new task', title: 'Turn work into clear, actionable assignments.', text: 'Give every task a clear name, project, owner, status, priority, dates, and supporting description.', points: ['Structured project context', 'Clear responsibility', 'Useful status and priority'] },
      { eyebrow: 'Task list', title: 'See every task without searching across multiple places.', text: 'Search, filter, and review work by project, creator, source, status, date, and progress.', points: ['One connected task view', 'Fast filters and report export', 'Fresh progress and due-date signals'] },
      { eyebrow: 'Work behind progress', title: 'Understand effort behind every task.', text: 'Connect daily activity, Time Logs, AI-assisted mapping, timesheets, and summaries with individual assignments.', points: ['Less status chasing', 'Better workload context', 'Historical effort for future estimates'] },
    ],
    comparison: [['Standalone to-do item', 'Task connected with project context'], ['Status updated manually', 'Progress informed by broader work context'], ['Task count used as workload', 'Complexity, time, and effort considered'], ['Work scattered across tools', 'Searchable connected task view'], ['Weekly progress reconstructed', 'Activity and summaries support reviews']],
    process: ['Create the task', 'Connect the project', 'Assign owner and priority', 'Track work context', 'Review progress and report'],
    responsibility: { eyebrow: 'Responsible task intelligence', title: 'Task count alone is not productivity.', text: 'A complex task and a simple task cannot be compared by quantity. Use task data alongside effort, quality, workload, collaboration, and outcomes.', points: ['Respect role-based visibility', 'Discuss blockers with people', 'Use history to improve planning—not judge individuals'] },
    faqs: [['What are Ralvie Tasks?', 'A connected way to create, organize, assign, and track work with broader productivity context.'], ['Can tasks connect with projects?', 'Yes. Tasks can be organized within relevant projects.'], ['Can tasks have statuses and priorities?', 'Yes. Supported workflows help teams distinguish state and importance.'], ['Can activity map to tasks?', 'Ralvie can use relevant workplace activity for AI-assisted task mapping where supported.'], ['Can managers understand task workload?', 'Assignments, projects, activity, time, and reports add useful workload context.'], ['Does Ralvie measure productivity by tasks completed?', 'No. Task count alone is not a reliable productivity measure.']],
    finalEyebrow: 'Connect every task with the work behind it',
    finalTitle: 'Turn To-Do Lists Into Clearer Project Progress.',
    finalText: 'Create, assign, prioritize, and connect every task with the work that moves it forward.',
  },
  projects: {
    key: "projects",
    title: "AI Project Tracking & Work Intelligence | Ralvie AI Productivity",
    description: "Create, organize, and track projects with Ralvie AI Productivity. Connect workplace activity, tasks, time logs, AI-assisted timesheets, summaries, and reports.",
    eyebrow: "AI-powered project tracking",
    heroTitle: "Project Tracking That Connects Work, Time, and <em><span>Team Progress.</span></em>",
    heroLead: "Connect projects with tasks, time, and everyday work for a clearer view of delivery and execution.",
    heroBody: "",
    supporting: ["Project tracking", "Task management", "Work activity", "AI project mapping", "Time & effort visibility", "Project reports"],
    introEyebrow: "Project intelligence",
    introTitle: "Connect everyday work with the <em><span>projects that matter.</span></em>",
    introText: "Move beyond project status and understand what work happened, which tasks received effort, who contributed, and where team time is going.",
    highlights: [['plus', 'Project creation', 'Give every initiative a clear starting point.'], ['users', 'Project team', 'Bring the right contributors together.'], ['list-check', 'Tasks & milestones', 'Turn goals into actionable work.'], ['bolt', 'Activity context', 'Connect everyday work with initiatives.'], ['clock', 'Time & effort', 'Understand historical investment.'], ['chart-bar', 'Project intelligence', 'See workload, progress, and trends.']],
    stories: [
      { eyebrow: 'Create a new project', title: 'Give every initiative a clear starting point.', text: 'Organize client engagements, internal programs, development work, campaigns, and business goals with useful context.', points: ['Project name and description', 'Owners, contributors, and dates', 'Statuses, source, and budgets'] },
      { eyebrow: 'Project list', title: 'See your projects without searching across systems.', text: 'Search and filter projects by status, source, contributors, due dates, and progress.', points: ['Clear portfolio view', 'Progress and overdue signals', 'Connected report export'] },
      { eyebrow: 'Work behind the plan', title: 'Understand what daily work is supporting.', text: 'Connect activity, tasks, Time Logs, AI-assisted project mapping, timesheets, summaries, and reports.', points: ['See team contribution', 'Understand project effort', 'Use completed work for better estimates'] },
    ],
    comparison: [['Project status in isolation', 'Status plus activity and effort context'], ['Tasks spread across tools', 'Connected project work view'], ['Team contribution unclear', 'Contributors and relevant activity'], ['Time reconstructed later', 'Historical project time context'], ['Planning based on assumptions', 'Estimates informed by previous work']],
    process: ['Create the project', 'Build the team', 'Organize tasks and dates', 'Connect activity and time', 'Review progress and learn'],
    responsibility: { eyebrow: "Project context, not automatic judgment", title: "Understand the work without reducing it to one metric.", text: "Project performance depends on scope, quality, dependencies, complexity, collaboration, and outcomes—not activity or hours alone.", points: ["Review project context with the team", "Use workload signals as conversation starters", "Keep business outcomes and human judgment central"] },
    faqs: [["What are Ralvie Projects?", "A way to structure workplace activity around business initiatives while connecting tasks, time, summaries, and reporting."], ["Can projects contain tasks?", "Yes. Tasks can break larger initiatives into actionable work."], ["Can activity map to projects?", "Ralvie can use relevant activity as context for AI-assisted project mapping."], ["Can projects connect with Time Logs?", "Yes. Time Logs provide historical workplace context for projects."], ["Can managers understand project effort?", "Activity, time, tasks, and reports provide broader effort context."], ["Can Ralvie support client projects?", "Yes. Projects can represent client engagements, campaigns, delivery work, development programs, and internal initiatives."]],
    finalEyebrow: "Connect project plans with the work behind them",
    finalTitle: "Understand Every Project From Activity to Outcome.",
    finalText: "Create the project, build the team, connect the work, and understand effort with clearer context.",
  },
  dashboard: {
    key: "dashboard",
    title: "AI Productivity Dashboard & Workforce Analytics | Ralvie AI Productivity",
    description: "Turn workplace activity into actionable productivity insights with Ralvie AI Productivity Dashboard. Understand team workload, project effort, application usage, time distribution, and task progress.",
    eyebrow: "AI productivity dashboard",
    heroTitle: "Productivity Dashboards That Turn Work Data Into <em><span>Actionable Insights.</span></em>",
    heroLead: "Bring activity, projects, tasks, time, and workload into one clear view of what needs attention next.",
    heroBody: "",
    supporting: ["Productivity overview", "Team insights", "Project visibility", "Workload analytics", "Application usage", "Time distribution"],
    introEyebrow: "Productivity intelligence at a glance",
    introTitle: "Turn everyday work data into <em><span>better decisions.</span></em>",
    introText: "Move from raw activity to clear work context to actionable productivity insights—without searching through every individual record.",
    highlights: [['chart-bar', 'Productivity overview', 'See the signals that deserve attention.'], ['users', 'Team insights', 'Understand workload and work distribution.'], ['folder', 'Project visibility', 'Review project effort and contributors.'], ['list-check', 'Task progress', 'See work state and task context.'], ['squares', 'Application usage', 'Understand the tools behind work.'], ['clock', 'Time patterns', 'Compare distribution across periods.']],
    stories: [
      { eyebrow: 'One clear view of work', title: 'Understand the big picture without reading every record.', text: 'Bring activity, projects, tasks, time, applications, workload, and trends into one role-aware overview.', points: ['Key metrics and trend signals', 'Project and team allocation', 'Configurable reporting periods'] },
      { eyebrow: 'From data to decisions', title: 'Know what deserves a closer look.', text: 'Use dashboard signals to investigate workload changes, project effort, focus patterns, and application usage.', points: ['Spot changes earlier', 'Compare trends with context', 'Move from noticing to investigating'] },
      { eyebrow: 'Data plus narrative', title: 'Combine visual patterns with AI work summaries.', text: 'Charts show what changed. Summary Agent can help explain the relevant work completed during the period.', points: ['Quantitative context', 'Readable work narrative', 'Better manager conversations'] },
    ],
    comparison: [['Data spread across systems', 'Connected productivity overview'], ['Reports prepared manually', 'Work data organized continuously'], ['Project status without effort', 'Project, activity, and time context'], ['Workload based on assumptions', 'Broader workload signals'], ['Trends discovered late', 'Historical patterns visible sooner']],
    process: ['Configure organization and roles', 'Employees work normally', 'Activity and work data connect', 'Dashboard visualizes insights', 'Teams investigate and act'],
    responsibility: { eyebrow: "Context over surveillance", title: "Don’t turn the dashboard into a leaderboard.", text: "A developer, designer, manager, salesperson, and analyst have different work patterns. Dashboard information should support judgment—not replace it.", points: ["Avoid simplistic employee rankings", "Interpret data with role and complexity", "Focus on better decisions and work environments"] },
    faqs: [["What is the Ralvie Productivity Dashboard?", "A visual view of workplace activity, projects, tasks, time, applications, workload, and productivity context."], ["Can managers see team productivity?", "Relevant team-level information can be available according to roles and permissions."], ["Can employees see their own data?", "Yes, according to the organization’s configuration."], ["Can the dashboard show project activity?", "Yes. Projects can combine activity, tasks, contributors, time, and context."], ["How is Dashboard different from Reports?", "Dashboard highlights what to notice; Reports provide deeper analysis underneath it."], ["Does Ralvie rank employees?", "No. Productivity should be interpreted with role, complexity, workload, collaboration, quality, progress, and outcomes."]],
    finalEyebrow: "Turn work data into action",
    finalTitle: "See What’s Happening. Understand the Pattern. Decide What Comes Next.",
    finalText: "Your teams already create the activity. Ralvie turns it into clearer productivity intelligence.",
  },
};
