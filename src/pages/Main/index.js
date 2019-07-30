import React, { Component } from "react";
import moment from "moment";
import api from "../../services/api";

import logo from "../../assets/logo.png";

import { Container, Form } from "./styles";

import CompareList from "../../components/CompareList";

class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: "",
    repositories: []
  };

  componentDidMount() {
    let repositories = JSON.parse(localStorage.getItem("repositories")) || [];
    this.setState({ repositories });
  }

  handleAddRepository = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(
        `/repos/${this.state.repositoryInput}`
      );

      repository.lastCommit = moment(repository.pushed_at).fromNow();
      repository.loading = false;

      this.setState(
        {
          repositoryError: false,
          repositoryInput: "",
          repositories: [...this.state.repositories, repository]
        },
        () => {
          localStorage.setItem(
            "repositories",
            JSON.stringify(this.state.repositories)
          );
        }
      );
    } catch (err) {
      this.setState({
        repositoryError: true
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleRefreshRepo = async ({ id, owner, name }) => {
    try {
      const { data: newRepository } = await api.get(`/repos/${owner}/${name}`);

      const repositories = this.state.repositories;
      const repoIndex = repositories.findIndex(
        repository => repository.id === id
      );
      repositories[repoIndex] = { ...newRepository };
      repositories[repoIndex].loading = false;
      repositories[repoIndex].lastCommit = moment(
        newRepository.pushed_at
      ).fromNow();

      this.setState(
        {
          repositories
        },
        () => {
          localStorage.setItem(
            "repositories",
            JSON.stringify(this.state.repositories)
          );
        }
      );
    } catch (err) {
      alert("Error updating repository");
    }
  };

  handleDeleteRepo = id => {
    const repositories = this.state.repositories.filter(
      repository => repository.id !== id
    );
    this.setState({ repositories }, () => {
      localStorage.setItem(
        "repositories",
        JSON.stringify(this.state.repositories)
      );
    });
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form
          withError={this.state.repositoryError}
          onSubmit={this.handleAddRepository}
        >
          <input
            type="text"
            placeholder="usuário/repositório"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">
            {this.state.loading ? (
              <i className="fa fa-spinner fa-pulse" />
            ) : (
              "OK"
            )}
          </button>
        </Form>

        <CompareList
          repositories={this.state.repositories}
          onRefreshRepo={this.handleRefreshRepo}
          onDeleteRepo={this.handleDeleteRepo}
        />
      </Container>
    );
  }
}

export default Main;
