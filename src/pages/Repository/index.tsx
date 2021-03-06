import React, { useEffect, useState } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import api from "../../services/api";

import logo from "../../assets/cosultgit.svg";

import SkeletonLoading from "../../components/SkeletonLoading";

import { Header, RepositoryInfo, Issues } from "./styles";

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadRepositoryInfo(): Promise<void> {
      setLoading(true);

      const [responseRepo, responseIssues] = await Promise.all([
        api.get(`repos/${params.repository}`),
        api.get(`repos/${params.repository}/issues`),
      ]);

      setRepository(responseRepo.data);
      setIssues(responseIssues.data);

      setLoading(false);
    }

    loadRepositoryInfo();
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logo} alt="Logo consultgithub" />

        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {loading ? (
        <SkeletonLoading />
      ) : (
        <>
          {repository && (
            <RepositoryInfo>
              <header>
                <img
                  src={repository.owner.avatar_url}
                  alt={repository.owner.login}
                />
                <div>
                  <strong>{repository.full_name}</strong>
                  <span>{repository.description}</span>
                </div>
              </header>

              <ul>
                <li>
                  <strong>{repository.stargazers_count}</strong>
                  <span>Estrelas</span>
                </li>
                <li>
                  <strong>{repository.forks_count}</strong>
                  <span>Forks</span>
                </li>
                <li>
                  <strong>{repository.open_issues_count}</strong>
                  <span>Issues abertas</span>
                </li>
                <li>
                  <strong>{repository.language}</strong>
                  <span>Linguagem</span>
                </li>
              </ul>
            </RepositoryInfo>
          )}

          <Issues>
            {issues.map((issue) => (
              <a key={issue.id} href={issue.html_url} target="__blank">
                <div>
                  <strong>{issue.title}</strong>
                  <span>{issue.user.login}</span>
                </div>

                <FiChevronRight size={20} color="#cbcbd6" />
              </a>
            ))}
          </Issues>
        </>
      )}
    </>
  );
};

export default Repository;
