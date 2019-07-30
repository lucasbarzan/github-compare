import React from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

import { Container, Repository, Button } from "./styles";

const CompareList = ({ repositories, onRefreshRepo, onDeleteRepo }) => (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id}>
        <header>
          <img src={repository.owner.avatar_url} alt="Facebook" />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
        </header>
        <ul>
          <li>
            {repository.stargazers_count} <small>stars</small>
          </li>
          <li>
            {repository.forks_count} <small>forks</small>
          </li>
          <li>
            {repository.open_issues_count} <small>issues</small>
          </li>
          <li>
            {repository.lastCommit} <small>last commit</small>
          </li>
        </ul>
        <div>
          <Button
            action={"refresh"}
            pos="left"
            onClick={() =>
              onRefreshRepo({
                id: repository.id,
                owner: repository.owner.login,
                name: repository.name
              })
            }
          >
            <FontAwesomeIcon icon={faSyncAlt} />
          </Button>
          <Button
            action={"delete"}
            pos="right"
            onClick={() => onDeleteRepo(repository.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      pushed_at: PropTypes.string
    })
  )
};

export default CompareList;
