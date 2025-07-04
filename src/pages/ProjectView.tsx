
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowLeft, Users, Settings, Share, Star, MoreHorizontal, Eye, Edit3, Trash2, Calendar, Clock, Target } from 'lucide-react';
import BoardView from '@/components/BoardView';
import SettingsDialog from '@/components/SettingsDialog';

const ProjectView = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);

  // Simular carregamento do projeto
  useEffect(() => {
    // Em uma aplicação real, isso viria de uma API ou estado global
    const mockProject = {
      id: projectId,
      name: 'Projeto Marketing 2024',
      description: 'Campanhas e estratégias de marketing para o próximo ano',
      status: 'active',
      members: 5,
      tasks: 24,
      completedTasks: 18,
      dueDate: '2024-02-15',
      view: 'board',
      favorite: true,
      columns: [
        { id: '1', name: 'Tarefa', type: 'text', width: 250 },
        { id: '2', name: 'Status', type: 'status', width: 150, options: ['Pendente', 'Em Progresso', 'Concluído'] },
        { id: '3', name: 'Responsável', type: 'person', width: 150 },
        { id: '4', name: 'Data de Entrega', type: 'date', width: 140 },
        { id: '5', name: 'Prioridade', type: 'dropdown', width: 120, options: ['Baixa', 'Média', 'Alta'] }
      ],
      items: [
        {
          id: '1',
          '1': 'Criar campanha nas redes sociais',
          '2': 'Em Progresso',
          '3': 'user1',
          '4': '2024-01-30',
          '5': 'Alta'
        },
        {
          id: '2',
          '1': 'Desenvolver material gráfico',
          '2': 'Pendente',
          '3': 'user2',
          '4': '2024-02-05',
          '5': 'Média'
        }
      ]
    };
    setProject(mockProject);
  }, [projectId]);

  const handleUpdateProject = (updatedProject: any) => {
    setProject(updatedProject);
    // Em uma aplicação real, isso salvaria no backend
    console.log('Projeto atualizado:', updatedProject);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'completed': return 'Concluído';
      case 'paused': return 'Pausado';
      default: return status;
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando projeto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar</span>
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold">{project.name}</h1>
              <button
                onClick={() => handleUpdateProject({ ...project, favorite: !project.favorite })}
                className="text-gray-400 hover:text-yellow-500"
              >
                <Star className={`h-5 w-5 ${project.favorite ? 'fill-yellow-500 text-yellow-500' : ''}`} />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              {/* Project Info */}
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Target className="h-4 w-4" />
                  <span>{project.completedTasks}/{project.tasks} tarefas</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{project.members} membros</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(project.dueDate).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              <Badge className={getStatusColor(project.status)}>
                {getStatusLabel(project.status)}
              </Badge>

              {/* Actions */}
              <Button variant="outline" className="flex items-center space-x-2">
                <Share className="h-4 w-4" />
                <span>Compartilhar</span>
              </Button>

              <SettingsDialog 
                trigger={
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurações
                  </Button>
                }
              />

              {/* User Avatar */}
              <Avatar className="h-8 w-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        <BoardView project={project} onUpdateProject={handleUpdateProject} />
      </main>
    </div>
  );
};

export default ProjectView;
