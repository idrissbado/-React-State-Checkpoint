import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { 
  Navbar, 
  Button, 
  Card, 
  Container, 
  Row, 
  Col, 
  ProgressBar,
  Badge
} from "react-bootstrap";
import { Clock } from "react-bootstrap-icons";

/**
 * Main application component displaying an interactive developer profile
 * Features dynamic content toggling, time tracking, and skill visualization
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    
    // Initialize component state
    this.state = {
      person: {
        fullName: "Idriss Bado",
        bio: "Innovative full-stack developer specializing in modern web technologies. Passionate about creating efficient, scalable solutions with cutting-edge tools.",
        imgSrc: "/profile-img.jpg",
        profession: "Senior FullStack Developer",
        skills: ["React", "Node.js", "Python", "AWS", "MongoDB"]
      },
      shows: false,
      mountTime: new Date(),
      timeSinceMount: 0
    };
  }

  // Lifecycle Methods
  componentDidMount() {
    /** Set up interval to update time since mount every second */
    this.interval = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  componentWillUnmount() {
    /** Clean up interval to prevent memory leaks */
    clearInterval(this.interval);
  }

  // Event Handlers
  toggleProfile = () => {
    /** Toggle profile visibility state */
    this.setState(prevState => ({ shows: !prevState.shows }));
  };

  // Helper Methods
  updateTimer = () => {
    /** Calculate time elapsed since component mount */
    const elapsed = Math.floor((new Date() - this.state.mountTime) / 1000);
    this.setState({ timeSinceMount: elapsed });
  };

  renderSkills() {
    /** Render skill badges from person's skills array */
    return this.state.person.skills.map((skill, index) => (
      <Badge 
        key={index}
        pill 
        bg="secondary" 
        className="px-3 py-2 skill-badge"
      >
        {skill}
      </Badge>
    ));
  }

  renderProfileCard() {
    /** Render profile content when visible */
    const { person, timeSinceMount } = this.state;
    
    return (
      <Card className="shadow-lg mb-4 animate__animated animate__fadeIn">
        <Row className="g-0">
          <Col md={5}>
            <Card.Img 
              variant="top" 
              src={person.imgSrc} 
              className="profile-image"
              alt={`${person.fullName} profile`}
            />
          </Col>
          <Col md={7}>
            <Card.Body className="p-4">
              <Card.Title className="display-6 mb-3">
                {person.fullName}
                <Badge bg="info" className="ms-2">{person.profession}</Badge>
              </Card.Title>
              
              <Card.Text className="lead mb-4">
                {person.bio}
              </Card.Text>

              <div className="mb-4">
                <h5 className="text-muted mb-3">Technical Skills:</h5>
                <div className="d-flex flex-wrap gap-2">
                  {this.renderSkills()}
                </div>
              </div>

              <div className="mt-4">
                <h5 className="text-muted">
                  <Clock className="me-2" />
                  Time since profile activation:
                </h5>
                <ProgressBar 
                  now={(timeSinceMount % 60) * 1.6667} 
                  label={`${timeSinceMount} seconds`}
                  animated 
                  striped 
                  variant="warning"
                  className="mb-3"
                />
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  }

  render() {
    const { shows } = this.state;

    return (
      <div className="App">
        {/* Navigation Bar */}
        <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
          <Navbar.Brand href="#home">
            <Clock className="me-2" />
            Developer Profile Dashboard
          </Navbar.Brand>
        </Navbar>

        {/* Main Content */}
        <Container className="mt-5">
          <Row className="justify-content-center">
            <Col md={10}>
              {/* Header Section */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="text-primary">Developer Profile</h1>
                <Button 
                  variant={shows ? "outline-danger" : "outline-success"}
                  onClick={this.toggleProfile}
                  className="rounded-pill px-4"
                  aria-label={shows ? "Hide profile" : "Show profile"}
                >
                  {shows ? "🕵️ Hide Profile" : "👤 Show Profile"}
                </Button>
              </div>

              {/* Conditional Profile Display */}
              {shows ? this.renderProfileCard() : (
                <div className="text-center py-5">
                  <h3 className="text-muted">
                    Click the button to reveal developer profile
                  </h3>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;