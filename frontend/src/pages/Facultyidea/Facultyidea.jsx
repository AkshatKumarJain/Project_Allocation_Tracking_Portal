import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchX, Users } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import SearchInput from '../../components/common/SearchInput'
import EmptyState from '../../components/common/EmptyState'
import StageLocked from '../../components/common/StageLocked'
import StatusPill from '../../components/common/StatusPill'
import ProjectDrawer from '../../components/project/ProjectDrawer'
import { getFacultyProjects } from '../../services/facultyService'
import { getProjectSelectionStage } from '../../services/projectSelectionService'
import { domains } from '../../data/mockData'
import './Facultyidea.css'

function FacultyIdea() {
  const navigate = useNavigate()
  const [stage, setStage] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [domain, setDomain] = useState('')
  const [activeProject, setActiveProject] = useState(null)

  useEffect(() => {
    let isMounted = true
    Promise.all([getProjectSelectionStage('faculty-project'), getFacultyProjects()]).then(
      ([stageData, projectData]) => {
        if (!isMounted) return
        setStage(stageData)
        setProjects(projectData)
        setLoading(false)
      }
    )
    return () => {
      isMounted = false
    }
  }, [])

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesQuery =
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.faculty.toLowerCase().includes(query.toLowerCase())
      const matchesDomain = domain ? project.domain === domain : true
      return matchesQuery && matchesDomain
    })
  }, [projects, query, domain])

  function handleSelectProject(project) {
    navigate('/project-selection/student-idea', { state: { source: 'faculty', project } })
  }

  if (loading) {
    return (
      <div>
        <PageHeader heading="Faculty Proposed Projects" />
        <div className="loading-state">Loading faculty projects...</div>
      </div>
    )
  }

  if (stage && stage.status !== 'OPEN') {
    return (
      <div>
        <PageHeader heading="Faculty Proposed Projects" />
        <StageLocked title={stage.title} status={stage.status} windowLabel={stage.windowLabel} />
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        heading="Faculty Proposed Projects"
        subtext="Browse project topics floated by faculty members. Click a project to view full details and apply."
      />

      <div className="filter-bar">
        <SearchInput value={query} onChange={setQuery} placeholder="Search by title or faculty" />
        <select
          className="filter-select"
          value={domain}
          onChange={(event) => setDomain(event.target.value)}
        >
          <option value="">All Domains</option>
          {domains.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="results-count">
        <strong>{filtered.length}</strong> project{filtered.length === 1 ? '' : 's'} found
      </div>

      {filtered.length ? (
        <div className="faculty-idea-grid">
          {filtered.map((project) => (
            <button
              type="button"
              key={project.id}
              className="faculty-idea-card"
              onClick={() => setActiveProject(project)}
            >
              <div className="faculty-idea-card-top">
                <span className="faculty-idea-card-domain">{project.domain}</span>
                <StatusPill status={project.status} label={project.status === 'FULL' ? 'Full' : 'Open'} />
              </div>
              <div className="faculty-idea-card-title">{project.title}</div>
              <div className="faculty-idea-card-faculty">{project.faculty}</div>
              <div className="faculty-idea-card-seats">
                <Users size={13} strokeWidth={2} />
                {project.seatsAvailable} of {project.seatsTotal} seats open
              </div>
            </button>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={SearchX}
          title="No projects found"
          text="Try a different search term or clear the domain filter."
        />
      )}

      <ProjectDrawer
        open={Boolean(activeProject)}
        onClose={() => setActiveProject(null)}
        title={activeProject?.title}
        subtitle={activeProject ? `${activeProject.faculty} · ${activeProject.domain}` : ''}
      >
        {activeProject ? (
          <>
            <div className="detail-block">
              <div className="detail-block-label">Seats</div>
              <div className="faculty-idea-seats">
                <Users size={14} strokeWidth={2} />
                {activeProject.seatsAvailable} of {activeProject.seatsTotal} seats open
              </div>
            </div>

            <div className="detail-block">
              <div className="detail-block-label">Problem Statement</div>
              <p className="detail-block-text">{activeProject.problemStatement}</p>
            </div>

            <div className="detail-block">
              <div className="detail-block-label">Objectives</div>
              <ul className="detail-list">
                {activeProject.objectives.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="detail-block">
              <div className="detail-block-label">Expected Outcome</div>
              <p className="detail-block-text">{activeProject.expectedOutcome}</p>
            </div>

            <div className="detail-block">
              <div className="detail-block-label">Technologies</div>
              <div className="tech-tag-list">
                {activeProject.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            <div className="drawer-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setActiveProject(null)}>
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={activeProject.status === 'FULL'}
                onClick={() => handleSelectProject(activeProject)}
              >
                {activeProject.status === 'FULL' ? 'Seats Full' : 'Select This Project'}
              </button>
            </div>
          </>
        ) : null}
      </ProjectDrawer>
    </div>
  )
}

export default FacultyIdea
