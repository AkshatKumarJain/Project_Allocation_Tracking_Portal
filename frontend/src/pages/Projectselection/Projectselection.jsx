import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import StageCard from '../../components/project/StageCard'
import { getProjectSelectionStages } from '../../services/projectSelectionService'
import './Projectselection.css'

function ProjectSelection() {
  const [stages, setStages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    getProjectSelectionStages().then((data) => {
      if (isMounted) {
        setStages(data)
        setLoading(false)
      }
    })
    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return (
      <div>
        <PageHeader heading="Project Selection" />
        <div className="loading-state">Loading project selection stages...</div>
      </div>
    )
  }

  const openCount = stages.filter((stage) => stage.status === 'OPEN').length

  return (
    <div>
      <PageHeader
        heading="Project Selection"
        subtext="Complete your final year project selection through the three stages below. You can proceed with any stage that is currently open."
      />

      <div className="status-banner">
        <div className="status-banner-text">
          <strong>Current status:</strong> You have not selected a project yet. Proposal, faculty
          application and project bank selection open in sequence for your batch.
        </div>
        <div className="status-banner-stats">
          <div className="status-banner-stat">
            <div className="status-banner-stat-value">{openCount}</div>
            <div className="status-banner-stat-label">Stages Open</div>
          </div>
          <div className="status-banner-stat">
            <div className="status-banner-stat-value">26 Sep</div>
            <div className="status-banner-stat-label">Final Deadline</div>
          </div>
        </div>
      </div>

      <div className="selection-stages">
        {stages.map((stage) => (
          <StageCard stage={stage} key={stage.id} />
        ))}
      </div>
    </div>
  )
}

export default ProjectSelection
